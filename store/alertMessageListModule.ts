import { remove } from 'lodash'
import { ActionTree, MutationTree } from 'vuex'
import { AlertMessage } from '~/lib/class/common/AlertMessage'
import { actionsToActionTypes } from '~/lib/utility/actionTypes'

// mutation type
const INIT_ALERT_MESSAGE_LIST = 'INIT_ALERT_MESSAGE_LIST'
const SET_ALERT_MESSAGE_LIST = 'SET_ALERT_MESSAGE_LIST'
const SET_ALERT_MESSAGE = 'SET_ALERT_MESSAGE'
const PUSH_ALERT_MESSAGE = 'PUSH_ALERT_MESSAGE'
const PUSH_ALERT_MESSAGE_LIST = 'PUSH_ALERT_MESSAGE_LIST'
const DELETE_ALERT_MESSAGE = 'DELETE_ALERT_MESSAGE'
const HIDE_ALERT_MESSAGE = 'HIDE_ALERT_MESSAGE'

// action type
export const ActionTypes = actionsToActionTypes(
    ['pushAlertMessage', 'setAlertMessage', 'deleteAlertMessage', 'hideAlertMessage'],
    'alertMessageListModule'
)

export interface AlertMessageList {
    alertMessageList: AlertMessage[]
}

export const state = (): AlertMessageList => ({
    alertMessageList: []
})
export type State = ReturnType<typeof state>

export const actions: ActionTree<State, any> = {
    initAlertMessageList(context): void {
        context.commit(INIT_ALERT_MESSAGE_LIST)
    },
    pushAlertMessage(context, data): void {
        context.commit(PUSH_ALERT_MESSAGE, data)
    },
    setAlertMessage(context, data): void {
        context.commit(SET_ALERT_MESSAGE, data)
    },
    deleteAlertMessage(context, data): void {
        context.commit(DELETE_ALERT_MESSAGE, data)
    },
    hideAlertMessage(context, data): void {
        context.commit(HIDE_ALERT_MESSAGE, data)
    },
    pushAlertMessageList(context, data): void {
        context.commit(PUSH_ALERT_MESSAGE_LIST, data)
    },
    setAlertMessageList(context, data): void {
        context.commit(SET_ALERT_MESSAGE_LIST, data)
    }
}

export const mutations: MutationTree<State> = {
    [INIT_ALERT_MESSAGE_LIST](state): void {
        state.alertMessageList = []
    },
    [PUSH_ALERT_MESSAGE](state, alertMessage: AlertMessage): void {
        state.alertMessageList.push(new AlertMessage(alertMessage))
    },
    [SET_ALERT_MESSAGE](state, alertMessage: AlertMessage): void {
        state.alertMessageList = []
        state.alertMessageList.push(new AlertMessage(alertMessage))
    },
    [DELETE_ALERT_MESSAGE](state, data): void {
        remove(state.alertMessageList, (alertMessage: AlertMessage): boolean => {
            return alertMessage.id === data.id
        })
    },
    [HIDE_ALERT_MESSAGE](state, data): void {
        state.alertMessageList.find(alertMessage => {
            if (alertMessage.id === data.id) {
                alertMessage.isShow = false
            }
        })
    },
    [PUSH_ALERT_MESSAGE_LIST](state, list: AlertMessage[]): void {
        list.forEach((alertMessage): void => {
            state.alertMessageList.push(new AlertMessage(alertMessage))
        })
    },
    [SET_ALERT_MESSAGE_LIST](state, list: AlertMessage[]): void {
        state.alertMessageList = list
            ? list.map(
                  (alertMessage): AlertMessage => {
                      return new AlertMessage(alertMessage)
                  }
              )
            : []
    }
}
