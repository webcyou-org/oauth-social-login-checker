import { merge } from 'lodash'
import { ActionTree, MutationTree } from 'vuex/types/index'
import { OAuthFlow } from '~/lib/class/common/OAuthFlow'
import { actionsToActionTypes } from '~/lib/utility/actionTypes'

// mutation type
export const SET_OAUTH_FLOW = 'SET_OAUTH_FLOW'
export const UPDATE_OAUTH_FLOW = 'UPDATE_OAUTH_FLOW'

// action type
export const ActionTypes = actionsToActionTypes(['show', 'hide', 'update'], 'oAuthFlowModule')

export const state = (): { oAuthFlow: OAuthFlow } => ({
    oAuthFlow: new OAuthFlow()
})

export type State = ReturnType<typeof state>

export const actions: ActionTree<State, any> = {
    show(context): void {
        context.commit(UPDATE_OAUTH_FLOW, { isShow: true })
    },
    hide(context): void {
        context.commit(UPDATE_OAUTH_FLOW, { isShow: false })
    },
    async update(context, data): Promise<void> {
        context.commit(UPDATE_OAUTH_FLOW, data)
    }
}

export const mutations: MutationTree<State> = {
    [SET_OAUTH_FLOW](state, payload): void {
        state.oAuthFlow = new OAuthFlow(payload)
    },
    [UPDATE_OAUTH_FLOW](state: any, payload): void {
        state.oAuthFlow = merge(state.oAuthFlow, payload)
    }
}
