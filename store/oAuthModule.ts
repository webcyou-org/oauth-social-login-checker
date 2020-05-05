import { merge } from 'lodash'
import { ActionTree, MutationTree } from 'vuex/types/index'
import { OAuth } from '~/lib/class/OAuth'
import { actionsToActionTypes } from '~/lib/utility/actionTypes'

// mutation type
const INIT_OAUTH = 'INIT_OAUTH'
const SET_OAUTH = 'SET_OAUTH'
const UPDATE_OAUTH = 'UPDATE_OAUTH'

// action type
export const ActionTypes = actionsToActionTypes(['getOauth'], 'oAuthModule')

export const state = (): { oauth: OAuth } => ({
    oauth: new OAuth()
})

export type State = ReturnType<typeof state>

export const actions: ActionTree<State, any> = {
    async getOauth(context): Promise<void> {
        // const response: { data: { oauth: OAuth } } = await this.$service.get(context, `/oauth/${id}`)
        // context.commit(SET_OAUTH, response.data.oauth)
    },
    async googleLogin(context): Promise<void> {}
}

export const mutations: MutationTree<State> = {
    [INIT_OAUTH](state): void {
        state.oauth = new OAuth()
    },
    [SET_OAUTH](state, payload): void {
        state.oauth = new OAuth(payload)
    },
    [UPDATE_OAUTH](state, payload): void {
        state.oauth = merge(state.oauth, payload)
    }
}
