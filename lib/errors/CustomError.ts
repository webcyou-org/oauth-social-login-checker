import { Context } from '@nuxt/types'

export interface CustomError extends Error {
    // Unique code for error
    readonly code: number

    // Developer-friendly error message.
    readonly message: string

    // Where available - stack back trace in a string.
    readonly stack?: string

    // HTTP status code
    status: number

    // display message
    userMessage?: string
}

// Based on code from:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error#Custom_Error_Types
export abstract class CustomError extends Error {
    name = 'CustomError'

    constructor(data: any, status = 200) {
        super(data)

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, CustomError)
        }

        this.status = status
    }

    /**
     * エラーハンドリングの具体的な処理
     */
    abstract async executeFailureHandling({ app, store }: Pick<Context, 'app' | 'store'>): Promise<void>
}
