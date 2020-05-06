import { NuxtAppOptions } from '@nuxt/types'
import { AxiosError, AxiosRequestConfig, AxiosResponse, Method } from 'axios'
import { ActionContext, Commit } from 'vuex'
import { ServerError } from '~/lib/errors/ServerError'
import { UnauthorizedError } from '~/lib/errors/UnauthorizedError'
import { BadRequestError } from '~/lib/errors/BadRequestError'
import { ActionTypes as LoadingActionTypes } from '~/store/loadingModule'

export interface ServiceErrorHandlerAppInfo {
    app: NuxtAppOptions
    commit: Commit
}

export abstract class AbstractService {
    private app: NuxtAppOptions

    public constructor(args: NuxtAppOptions) {
        this.app = args
    }

    // fetch request parameterの準備
    protected abstract prepareFetchParameter(requestParameter?: any): void
    // request config 構築
    protected abstract buildRequestConfig(rootState: any, requestParameter?: any): AxiosRequestConfig

    protected async fetch(
        context: ActionContext<any, any>,
        type: Method,
        uri?: string,
        requestParameter?: any
    ): Promise<any> {
        let params = ''

        if (requestParameter) {
            this.prepareFetchParameter(requestParameter)

            params = requestParameter.params
            delete requestParameter.params
        }

        // NOTE: (ドキュメント)https://github.com/axios/axios#axiosrequestconfig-1
        const response: AxiosResponse = await this.app.$axios
            .request(
                Object.assign(
                    { method: type, params, timeout: 60000 },
                    this.buildRequestConfig(context.rootState, { uri, data: requestParameter })
                )
            )
            .catch(
                (error: AxiosError): Promise<any> => {
                    // hide loading
                    if (this.app.store) {
                        this.app.store.dispatch(LoadingActionTypes.hideLoading)
                    }
                    if (error.response) {
                        const { status } = error.response

                        // BadRequestError
                        if (status === BadRequestError.STATUS_CODE) {
                            throw new BadRequestError(error)
                        }
                        // UnauthorizedError
                        if (status === UnauthorizedError.STATUS_CODE) {
                            throw new UnauthorizedError(error)
                        }
                    }
                    throw error
                }
            )

        // API呼び出しでエラーが発生しなかった場合
        const { data } = response

        // status 200 && Return from Server ecode
        if (data && data.ecode > 0) {
            // hide loading
            if (this.app.store) {
                this.app.store.dispatch(LoadingActionTypes.hideLoading)
            }
            throw new ServerError(data, response.status)
        }
        return data
    }

    public get(context: ActionContext<any, any>, uri: string, params?: any): Promise<any> {
        const data = {
            params
        }
        return this.fetch(context, 'get', uri, data)
    }

    public post(context: ActionContext<any, any>, uri?: string, data?: any): Promise<any> {
        return this.fetch(context, 'post', uri, data)
    }

    public put(context: ActionContext<any, any>, uri: string, data?: any): Promise<any> {
        return this.fetch(context, 'put', uri, data)
    }

    public patch(context: ActionContext<any, any>, uri: string, data?: any): Promise<any> {
        return this.fetch(context, 'patch', uri, data)
    }

    public delete(context: ActionContext<any, any>, uri: string, data?: any): Promise<any> {
        return this.fetch(context, 'delete', uri, data)
    }
}
