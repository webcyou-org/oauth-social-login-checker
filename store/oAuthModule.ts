import { merge, omit, find } from 'lodash'
import { ActionTree, MutationTree } from 'vuex/types/index'
import { Storage, LOCAL_STORAGE_KEY } from '~/lib/class/Storage'
import { actionsToActionTypes } from '~/lib/utility/actionTypes'
import { createProviderList } from '~/lib/utility/provider'

// mutation type
const SET_PROVIDER = 'SET_PROVIDER'
const GET_PROVIDER = 'GET_PROVIDER'
const UPDATE_PROVIDER = 'UPDATE_PROVIDER'
const RESET_PROVIDER = 'RESET_PROVIDER'
const PROVIDER_NEXT_REQUEST = 'PROVIDER_NEXT_REQUEST'
const SET_STORAGE_TYPE = 'SET_STORAGE_TYPE'
const RESET_STORAGE_TYPE = 'RESET_STORAGE_TYPE'
const SET_STORAGE_PROVIDER = 'SET_STORAGE_PROVIDER'

// action type
export const ActionTypes = actionsToActionTypes([
    'setProvider',
    'updateProvider',
    'resetProvider',
    'providerChangeRequest',
    'providerRequest',
    'setStorageType',
    'resetStorageType',
    'setStorageProvider'
    ],
    'oAuthModule'
)

const appLocalStorage = new Storage()

export const state = (): { storage: Storage, provider: any, providerList: any[] } => ({
    storage: appLocalStorage,
    provider: null,
    providerList: createProviderList()
})

export type State = ReturnType<typeof state>

export const actions: ActionTree<State, any> = {
    setProvider(context, data): void {
        context.commit(SET_PROVIDER, data)
    },

    async updateProvider(context, data): Promise<void> {
        context.commit(UPDATE_PROVIDER, data)
    },

    resetProvider(context): void {
        context.commit(RESET_PROVIDER)
    },

    async providerRequest(context): Promise<void> {
        const provider = context.state.provider
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
    [SET_PROVIDER](state: any, payload): void {
        const lowerCaseProviderName = payload.name.toLowerCase()
        //noinspection TypeScriptValidateTypes
        state.provider = find(state.providerList, { idName: lowerCaseProviderName })
    },
    [UPDATE_PROVIDER](state: any, payload): void {
        const lowerCaseProviderName = payload.name.toLowerCase()
        const params = omit(payload, ['name'])
        //noinspection TypeScriptValidateTypes
        let provider = find(state.providerList, { idName: lowerCaseProviderName })
        //noinspection TypeScriptValidateTypes
        provider = merge(provider, params)
        state.provider = provider

        if (state.storage.type === 'localStorage') {
            state.storage.data[lowerCaseProviderName] = provider
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state.storage))
        }
    },
    [RESET_PROVIDER](state): void {
        state.provider = null
    },
    [PROVIDER_NEXT_REQUEST](state): void {
        const provider = state.provider
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
        const lowerCaseProviderName = state.provider.name.toLowerCase()
        state.storage.data[lowerCaseProviderName] = state.provider
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state.storage))
    }
}
