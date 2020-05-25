import { cloneDeep } from 'lodash'
import { ActionTree, MutationTree } from 'vuex/types/index'
import { Storage, LOCAL_STORAGE_KEY } from '~/lib/class/Storage'
import { actionsToActionTypes } from '~/lib/utility/actionTypes'

// mutation type
const SET_STORAGE_TYPE = 'SET_STORAGE_TYPE'
const RESET_STORAGE_TYPE = 'RESET_STORAGE_TYPE'
const SET_STORAGE_PROVIDER = 'SET_STORAGE_PROVIDER'

// action type
export const ActionTypes = actionsToActionTypes([
        'setStorageType',
        'resetStorageType',
        'setStorageProvider'
    ],
    'storageModule'
)

const appLocalStorage = new Storage()

export const state = (): { storage: Storage } => ({
    storage: appLocalStorage
})

export type State = ReturnType<typeof state>

export const actions: ActionTree<State, any> = {
    setStorageType(context, data): void {
        context.commit(SET_STORAGE_TYPE, data)
    },

    resetStorageType(context): void {
        context.commit(RESET_STORAGE_TYPE)
    },

    setStorageProvider(context, provider): void {
        context.commit(SET_STORAGE_PROVIDER, provider)
    },
}

export const mutations: MutationTree<State> = {
    [SET_STORAGE_TYPE](state, payload): void {
        state.storage.type = payload
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state.storage))
    },
    [RESET_STORAGE_TYPE](state): void {
        localStorage.removeItem(LOCAL_STORAGE_KEY)
        state.storage = new Storage()
    },
    [SET_STORAGE_PROVIDER](state, provider): void {
        if (state.storage.type === 'localStorage') {
            state.storage.data[provider.idName] = cloneDeep(provider)
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state.storage))
        }
    }
}
