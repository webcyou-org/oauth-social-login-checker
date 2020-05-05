import { ActionTree, MutationTree } from 'vuex/types/index'
import { ErrorClass } from '~/lib/errors/ErrorClass'
import { actionsToActionTypes } from '~/lib/utility/actionTypes'
import { ActionTypes as AlertMessageListActionTypes } from '~/store/alertMessageListModule'

// mutation type
const SET_ERROR = 'SET_ERROR'

// action type
export const ActionTypes = actionsToActionTypes(['setError'], 'errorModule')

export const state = (): { error: ErrorClass } => ({
    error: new ErrorClass()
})
export type State = ReturnType<typeof state>

export const actions: ActionTree<State, any> = {
    async setError(context, data): Promise<void> {
        context.commit(SET_ERROR, data)
        await context.dispatch('emitError')
    },

    async emitError(context): Promise<void> {
        const ecode = context.state.error.ecode
        const isSingle = context.state.error.isSingle
        const dispatch = isSingle
            ? AlertMessageListActionTypes.setAlertMessage
            : AlertMessageListActionTypes.pushAlertMessage
        let message = context.state.error.message
        const userMessage = context.state.error.userMessage

        await context.dispatch(
            dispatch,
            {
                type: 'error',
                message: userMessage || (ecode ? `${message} (error: ${ecode})` : message)
            },
            { root: true }
        )
    }
}

export const mutations: MutationTree<State> = {
    [SET_ERROR](state, payload): void {
        state.error = new ErrorClass(payload)
    }
}
