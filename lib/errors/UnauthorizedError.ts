import { Context } from '@nuxt/types'
import { CustomError } from './CustomError'

/**
 * HTTP status = 401
 */
export class UnauthorizedError extends CustomError {
    readonly name = 'UnauthorizedError'

    static STATUS_CODE = 401

    constructor(err: Error, status = UnauthorizedError.STATUS_CODE) {
        super(err, status)

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, UnauthorizedError)
        }
        this.userMessage = 'UnauthorizedError'
    }

    async executeFailureHandling({ app, store }: Context): Promise<void> {
        console.warn(this)
    }
}
