import { merge, omit, find } from 'lodash'
import { ActionTree, MutationTree } from 'vuex/types/index'
import { actionsToActionTypes } from '~/lib/utility/actionTypes'
import { createProviderList } from '~/lib/utility/provider'

// mutation type
const SET_PROVIDER = 'SET_PROVIDER'
const GET_PROVIDER = 'GET_PROVIDER'
const UPDATE_PROVIDER = 'UPDATE_PROVIDER'
const RESET_PROVIDER = 'RESET_PROVIDER'
const PROVIDER_NEXT_REQUEST = 'PROVIDER_NEXT_REQUEST'

// action type
export const ActionTypes = actionsToActionTypes([
    'setProvider',
    'updateProvider',
    'resetProvider',
    'providerChangeRequest',
    'providerRequest'
    ],
    'oAuthModule'
)

export const state = (): { provider: any, providerList: any[] } => ({
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
    }
}

export const mutations: MutationTree<State> = {
    [SET_PROVIDER](state: any, payload): void {
        state.provider = find(state.providerList, { idName: payload.name.toLowerCase() } as any)
    },
    [UPDATE_PROVIDER](state: any, payload): void {
        const params = omit(payload, ['name'])
        let provider: any = find(state.providerList, { idName: state.provider.idName } as any)
        provider = merge(provider, params)
        state.provider = provider
    },
    [RESET_PROVIDER](state): void {
        let provider: any = find(state.providerList, { idName: state.provider.idName } as any)
        state.provider = null
        provider.requestStep = ''
    },
    [PROVIDER_NEXT_REQUEST](state): void {
        const provider = state.provider
        provider.requestStep = provider.requestStepList[0]
        provider.requestStepHistoryList.push(provider.requestStepList[0])
        provider.requestStepList.shift()
    }
}
