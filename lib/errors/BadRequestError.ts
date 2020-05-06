import { Context } from '@nuxt/types'
import { CustomError } from './CustomError'

/**
 * HTTP status = 400
 */
export class BadRequestError extends CustomError {
    readonly name = 'BadRequestError'

    static STATUS_CODE = 400

    constructor(err: Error, status = BadRequestError.STATUS_CODE) {
        super(err, status)

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, BadRequestError)
        }
        this.userMessage = 'BadRequestError'
    }

    async executeFailureHandling({ app, store }: Context): Promise<void> {
        console.warn(this)
    }
}
