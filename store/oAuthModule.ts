import { merge, omit } from 'lodash'
import { ActionTree, MutationTree } from 'vuex/types/index'
import { OAuth } from '~/lib/class/OAuth'
import { Google } from '~/lib/class/provider/Google'
import { Facebook } from '~/lib/class/provider/Facebook'
import { GitHub } from '~/lib/class/provider/GitHub'
import { Twitter } from '~/lib/class/provider/Twitter'
import { ProviderMap } from '~/lib/config/provider_list'
import { actionsToActionTypes } from '~/lib/utility/actionTypes'

// mutation type
const SET_PROVIDER = 'SET_PROVIDER'
const UPDATE_PROVIDER = 'UPDATE_PROVIDER'
const SET_SELECTED_PROVIDER = 'SET_SELECTED_PROVIDER'
const RESET_SELECTED_PROVIDER = 'RESET_SELECTED_PROVIDER'
const PROVIDER_NEXT_REQUEST = 'PROVIDER_NEXT_REQUEST'

// action type
export const ActionTypes = actionsToActionTypes([
    'setProvider',
    'updateProvider',
    'setSelectedProvider',
    'resetSelectedProvider',
    'providerChangeRequest',
    'providerRequest'
    ],
    'oAuthModule'
)

export const state = (): { oauth: OAuth, google: Google, facebook: Facebook, github: GitHub, twitter: Twitter, selectedProvider: any } => ({
    oauth: new OAuth(),
    google: new Google(),
    facebook: new Facebook(),
    github: new GitHub(),
    twitter: new Twitter(),
    selectedProvider: null
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
    }
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
    }
}
