import { ActionTree, MutationTree } from 'vuex/types/index'
import { Loading } from '~/lib/class/common/Loading'
import { actionsToActionTypes } from '~/lib/utility/actionTypes'

// mutation type
export const SET_LOADING = 'SET_LOADING'

// action type
export const ActionTypes = actionsToActionTypes(['showLoading', 'hideLoading'], 'loadingModule')

export const state = (): { loading: Loading } => ({
    loading: new Loading()
})

export type State = ReturnType<typeof state>

export const actions: ActionTree<State, any> = {
    showLoading(context): void {
        context.commit(SET_LOADING, { isShow: true })
    },
    hideLoading(context): void {
        context.commit(SET_LOADING, { isShow: false })
    }
}

export const mutations: MutationTree<State> = {
    [SET_LOADING](state, payload): void {
        state.loading = new Loading(payload)
    }
}
