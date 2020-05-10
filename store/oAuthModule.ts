import { merge, omit } from 'lodash'
import { ActionTree, MutationTree } from 'vuex/types/index'
import { OAuth } from '~/lib/class/OAuth'
import { Google } from '~/lib/class/provider/Google'
import { Facebook } from '~/lib/class/provider/Facebook'
import { GitHub } from '~/lib/class/provider/GitHub'
import { Twitter } from '~/lib/class/provider/Twitter'
import { ProviderMap } from '~/lib/config/provider_list'
import { Storage, LOCAL_STORAGE_KEY } from '~/lib/class/Storage'
import { actionsToActionTypes } from '~/lib/utility/actionTypes'

// mutation type
const SET_PROVIDER = 'SET_PROVIDER'
const UPDATE_PROVIDER = 'UPDATE_PROVIDER'
const SET_SELECTED_PROVIDER = 'SET_SELECTED_PROVIDER'
const RESET_SELECTED_PROVIDER = 'RESET_SELECTED_PROVIDER'
const PROVIDER_NEXT_REQUEST = 'PROVIDER_NEXT_REQUEST'
const SET_STORAGE_TYPE = 'SET_STORAGE_TYPE'
const RESET_STORAGE_TYPE = 'RESET_STORAGE_TYPE'
const SET_STORAGE_PROVIDER = 'SET_STORAGE_PROVIDER'

// action type
export const ActionTypes = actionsToActionTypes([
    'setProvider',
    'updateProvider',
    'setSelectedProvider',
    'resetSelectedProvider',
    'providerChangeRequest',
    'providerRequest',
    'setStorageType',
    'resetStorageType',
    'setStorageProvider'
    ],
    'oAuthModule'
)

const appLocalStorage = new Storage()

export const state = (): { oauth: OAuth, google: Google, facebook: Facebook, github: GitHub, twitter: Twitter, selectedProvider: any, storage: Storage } => ({
    oauth: new OAuth(),
    google: appLocalStorage.isProvider('google') ? new Google(appLocalStorage.getProvider('google')) : new Google(),
    facebook: appLocalStorage.isProvider('facebook') ? new Facebook(appLocalStorage.getProvider('facebook')) : new Facebook(),
    github: appLocalStorage.isProvider('github') ? new GitHub(appLocalStorage.getProvider('github')) : new GitHub(),
    twitter: appLocalStorage.isProvider('twitter') ? new Twitter(appLocalStorage.getProvider('twitter')) : new Twitter(),
    selectedProvider: null,
    storage: appLocalStorage
})

export type State = ReturnType<typeof state>

export const actions: ActionTree<State, any> = {
    async setProvider(context, data): Promise<void> {
        context.commit(SET_PROVIDER, data)
    },

    async updateProvider(context, data): Promise<void> {
        context.commit(UPDATE_PROVIDER, data)
    },

    async providerRequest(context): Promise<void> {
        const provider = context.state.selectedProvider
        const $service: any = this.$service
        const response = await $service[provider.requestMethod](
            context,
            provider.requestURI,
            provider.requestParams
        )
        return response
    },

    async providerChangeRequest(context): Promise<void> {
        context.commit(PROVIDER_NEXT_REQUEST)
    },

    setSelectedProvider(context, data): void {
        context.commit(SET_SELECTED_PROVIDER, data)
    },

    resetSelectedProvider(context): void {
        context.commit(RESET_SELECTED_PROVIDER)
    },

    setStorageType(context, data): void {
        context.commit(SET_STORAGE_TYPE, data)
    },

    resetStorageType(context): void {
        context.commit(RESET_STORAGE_TYPE)
    },

    setStorageProvider(context, name): void {
        context.commit(SET_STORAGE_PROVIDER, name)
    },
}

export const mutations: MutationTree<State> = {
    [SET_PROVIDER](state: any, payload: any): void {
        const lowerCaseProviderName = payload.name.toLowerCase()
        const params = omit(payload, ['name'])
        state[lowerCaseProviderName] = new ProviderMap[lowerCaseProviderName](params)
    },
    [UPDATE_PROVIDER](state: any, payload): void {
        const lowerCaseProviderName = payload.name.toLowerCase()
        const params = omit(payload, ['name'])
        state[lowerCaseProviderName] = merge(state[lowerCaseProviderName], params)

        if (state.storage.type === 'localStorage') {
            state.storage.data[lowerCaseProviderName] = state[lowerCaseProviderName]
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state.storage))
        }
    },
    [SET_SELECTED_PROVIDER](state: any, payload): void {
        state.selectedProvider = state[payload.name.toLowerCase()]
    },
    [RESET_SELECTED_PROVIDER](state): void {
        state.selectedProvider = null
    },
    [PROVIDER_NEXT_REQUEST](state): void {
        const provider = state.selectedProvider
        provider.requestStep = provider.requestStepList[0]
        provider.requestStepHistoryList.push(provider.requestStepList[0])
        provider.requestStepList.shift()
    },
    [SET_STORAGE_TYPE](state, payload): void {
        state.storage.type = payload
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state.storage))
    },
    [RESET_STORAGE_TYPE](state): void {
        localStorage.removeItem(LOCAL_STORAGE_KEY)
        state.storage = new Storage()
    },

    [SET_STORAGE_PROVIDER](state): void {
        const lowerCaseProviderName = state.selectedProvider.name.toLowerCase()
        state.storage.data[lowerCaseProviderName] = state.selectedProvider
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state.storage))
    }
}
