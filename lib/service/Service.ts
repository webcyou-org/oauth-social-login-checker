import { AxiosRequestConfig } from 'axios'
// import { merge } from 'lodash'
// import nuxtConfig from '../../nuxt.config.js'
import { AbstractService } from '~/lib/service/AbstractService'

export default class Service extends AbstractService {
    protected prepareFetchParameter(requestParameter?: any): void {
        if (requestParameter) {
            // merge
            // merge(requestParameter, { any })
        }
    }

    protected buildRequestConfig(rootState: any, requestParameter: { uri: string; data: any; headers: any }): AxiosRequestConfig {
        const { uri, data, headers } = requestParameter
        if (data.headers) {
            delete data.headers
        }
        return {
            url: uri,
            data,
            headers
        }
    }
}
