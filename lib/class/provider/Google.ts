import { Provider } from '../Provider'
import { OAuth } from '../OAuth'
import { GoogleURI } from '~/lib/enum/end_point_list'
import queryString from 'query-string'

export class Google extends Provider {
    public oauth: OAuth
    public authuser: string
    public prompt: string
    public requestData: any = {
        requestToken: {
            method: 'post',
            params: '',
            uri: GoogleURI.REQUEST_TOKEN,
            no: 10
        }
    }

    constructor(data?: any) {
        super(data)
        if (!data) data = {}

        this.scope = data.scope || 'openid profile email'
        this.name = data.name || 'Google'
        this.state = data.state || 'google'
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

    get isSetParams(): boolean {
        return false
    }

    get stepNumber(): number {
        if (this.requestStep === '') {
            return 3
        }
        return this.requestData[this.requestStep].no
    }

    get nextRequestText() {
        if (this.requestStep === 'requestToken') {
            return 'Request Token'
        }
    }
}
