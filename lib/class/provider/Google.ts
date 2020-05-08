import { Provider } from '../Provider'
import { OAuth } from '../OAuth'

import { GoogleURI } from '~/lib/enum/end_point_list'

import { pick } from 'lodash'
import queryString from 'query-string'

export class Google extends Provider {
    public oauth: OAuth
    public code: string

    constructor(data?: any) {
        if (!data) data = {}
        super(data)

        this.code = data.code || ''
        this.scope = data.scope || 'openid profile'
        this.name = data.name || 'Google'
        this.state = data.state || 'google'
        this.oauth = new OAuth()
    }

    get toRequest(): any {
        return {
            code: this.code,
            client_id: this.clientId,
            client_secret: this.clientSecret,
            redirect_uri: this.redirectUri,
            grant_type: this.grantType,
            response_type: this.responseType,
            scope: this.scope,
            state: this.state
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
        return {
            redirect_uri: this.redirectUri,
            response_type: this.responseType,
            scope: this.scope,
            state: this.state,
            nonce: ''
        }
    }

    getPickRequest(pickList: string[]): object {
        return pick(this.toRequest, pickList)
    }

    login() {
        location.href = this.loginURI
    }
}
