import { Provider } from '../Provider'
import { OAuth } from '../OAuth'

import { GoogleURI } from '~/lib/enum/end_point_list'

import { pick } from 'lodash'
import queryString from 'query-string'

export class Google extends Provider {
    public oauth: OAuth
    public code: string
    public nonce: string

    constructor(data?: any) {
        if (!data) data = {}
        super(data)

        this.code = data.code || ''
        this.scope = data.scope || 'openid profile'
        this.name = data.name || 'Google'
        this.state = data.state || 'google'
        this.nonce = data.nonce || ''
        this.oauth = new OAuth()
    }

    get toRequest(): any {
        return {
            code: this.code,
            client_id: this.clientId,
            client_secret: this.clientSecret,
            redirect_uri: this.redirectUri,
            response_type: this.responseType,
            grant_type: this.grantType,
            scope: this.scope,
            state: this.state,
            nonce: this.nonce
        }
    }

    getLoginQuery() {
        const params = this.getPickRequest([
            'response_type',
            'client_id',
            'redirect_uri',
            'scope',
            'state'
        ])
        return queryString.stringify(params)
    }

    get loginURI(): string {
        return `${GoogleURI.LOGIN}?${this.getLoginQuery()}`
    }

    get loginDisplayObject(): object {
        return this.getPickRequest([
            'redirect_uri',
            'response_type',
            'scope',
            'state',
            'nonce'
        ])
    }

    getPickRequest(pickList: string[]): object {
        return pick(this.toRequest, pickList)
    }
}
