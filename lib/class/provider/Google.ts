import { Provider } from '../Provider'
import { OAuth } from '../OAuth'

import { GoogleURI } from '~/lib/enum/end_point_list'

import { pick } from 'lodash'
import queryString from 'query-string'

export class Google extends Provider {
    public oauth: OAuth
    public code: string
    public nonce: string
    public authuser: string
    public prompt: string
    public requestStep: string = ''
    public requestStepList: string[] = ['requestToken']
    public requestStepHistoryList: string[] = []

    // response
    public access_token: string | null = null
    public expires_in: string | null = null
    public token_type: string | null = null
    public id_token: string | null = null

    constructor(data?: any) {
        super(data)
        if (!data) data = {}

        this.code = data.code || ''
        this.scope = data.scope || 'openid profile'
        this.name = data.name || 'Google'
        this.state = data.state || 'google'
        this.nonce = data.nonce || ''
        this.authuser = data.authuser || ''
        this.prompt = data.prompt || ''
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
            nonce: this.nonce,
            authuser: this.authuser,
            prompt: this.prompt,
            access_token: this.access_token,
            expires_in: this.expires_in,
            token_type: this.token_type,
            id_token: this.id_token
        }
    }

    get loginQuery() {
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
        return `${GoogleURI.LOGIN}?${this.loginQuery}`
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

    get callBackDisplayObject(): object {
        return this.getPickRequest([
            'state',
            'code',
            'scope',
            'authuser',
            'prompt',
            'redirect_uri',
            'access_token',
            'expires_in',
            'token_type',
            'id_token'
        ])
    }

    get requestTokenParams() {
        return this.getPickRequest([
            'code',
            'client_id',
            'client_secret',
            'redirect_uri',
            'grant_type'
        ])
    }

    get requestParams() {
        if (this.requestStep === 'requestToken') {
            return this.requestTokenParams
        }
    }

    get requestURI() {
        if (this.requestStep === 'requestToken') {
            return GoogleURI.REQUEST_TOKEN
        }
    }

    get requestMethod() {
        if (this.requestStep === 'requestToken') {
            return 'post'
        }
    }

    getPickRequest(pickList: string[]): object {
        return pick(this.toRequest, pickList)
    }
}
