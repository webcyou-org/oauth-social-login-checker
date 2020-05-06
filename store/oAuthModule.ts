import { merge } from 'lodash'
import { ActionTree, MutationTree } from 'vuex/types/index'
import { OAuth } from '~/lib/class/OAuth'
import { Google } from '~/lib/class/provider/Google'

import { ProviderMap } from '~/lib/class/ProviderMap'

import { actionsToActionTypes } from '~/lib/utility/actionTypes'

// mutation type
const INIT_OAUTH = 'INIT_OAUTH'
const SET_OAUTH = 'SET_OAUTH'
const UPDATE_OAUTH = 'UPDATE_OAUTH'

const SET_PROVIDER = 'SET_PROVIDER'
const UPDATE_PROVIDER = 'UPDATE_PROVIDER'

// action type
export const ActionTypes = actionsToActionTypes([
    'getOauth',
    'setProvider',
    'updateProvider',
    'googleLogin',
    'googleRequestToken'
    ],
    'oAuthModule'
)

export const state = (): { oauth: OAuth, google: Google } => ({
    oauth: new OAuth(),
    google: new Google()
})

export type State = ReturnType<typeof state>

export const actions: ActionTree<State, any> = {
    async getOauth(context): Promise<void> {
        // const response: { data: { oauth: OAuth } } = await this.$service.get(context, `/oauth/${id}`)
        // context.commit(SET_OAUTH, response.data.oauth)
    },

    async setProvider(context, data): Promise<void> {
        context.commit(SET_PROVIDER, data)
    },
    async updateProvider(context, data): Promise<void> {
        context.commit(UPDATE_PROVIDER, data)
    },

    async googleLogin(context): Promise<void> {},

    async googleRequestToken(context): Promise<void> {
        const params = context.state.google.getPickRequest([
            'code',
            'client_id',
            'client_secret',
            'redirect_uri',
            'grant_type'
        ])
        const response = await this.$service.post(
            context,
            '/google_oauth2/token',
            params
        )
        return response
    }
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
    },
    [SET_PROVIDER](state: any, payload: any): void {
        state[payload.name] = new ProviderMap[payload.name](payload)
    },
    [UPDATE_PROVIDER](state: any, payload): void {
        state[payload.name] = merge(state[payload.name], payload)
    },
}
