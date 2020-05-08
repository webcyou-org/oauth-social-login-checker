import { Context } from '@nuxt/types'
import { CustomError } from './CustomError'
import { ActionTypes as ErrorActionTypes } from '~/store/errorModule'

export interface ServerError extends CustomError {
    ecode: number
}

export class ServerError extends CustomError {
    readonly name = 'ServerError'

    constructor(data: { ecode: number; message: string; error: string }, status = 200) {
        super(data.message || data.error, status)

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, ServerError)
        }

        this.ecode = data.ecode || 0
    }

    async executeFailureHandling({ store }: Context): Promise<void> {
        if (this.ecode) {
            console.warn(`ecode: ${this.ecode}`)
        }
        console.warn(this)

        await store.dispatch(ErrorActionTypes.setError, this)
    }
}
