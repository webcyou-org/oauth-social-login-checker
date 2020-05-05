import { Context } from '@nuxt/types'
import { CustomError } from './CustomError'
import { ActionTypes as ErrorActionTypes } from '~/store/errorModule'

const isUnhandledPromise = (err: any): boolean => {
    return err && err.promise && err.type === 'unhandledrejection'
}

const isErrorEvent = (err: any): boolean => {
    return err && (err.filename || err.lineno || err.colno)
}

export const handleFailure = async ({ app, store, error }: Context, errorInformationObject: any): Promise<void> => {
    let _error: any

    // unhandled promise errorかどうか
    if (isUnhandledPromise(errorInformationObject)) {
        _error = errorInformationObject.reason
    }

    // ErrorEventかどうか
    if (isErrorEvent(errorInformationObject)) {
        _error = errorInformationObject.error
        _error.userMessage = '予期せぬエラーが発生しました。'
    }

    if (!_error) {
        _error = errorInformationObject
    }

    // CustomError派生エラーの場合は、各クラスのエラーハンドリング処理を実行
    if (_error.executeFailureHandling) {
        await (_error as CustomError).executeFailureHandling({ app, store })
        return
    }

    // その他のエラーの場合は、エラーalert表示&エラー画面を表示
    console.error(_error)
    await store.dispatch(ErrorActionTypes.setError, _error)
    // Nuxt エラー画面表示
    error(_error)
}
