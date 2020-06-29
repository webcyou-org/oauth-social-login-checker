import { Provider } from '../Provider'
import { OAuth } from '../OAuth'
import { FacebookURI } from '~/lib/enum/end_point_list'
import queryString from 'query-string'

export class Facebook extends Provider {
    public oauth: OAuth
    public data: any = null
    public requestData: any = {
        accessToken: {
            method: 'get',
            params: '',
            uri: FacebookURI.ACCESS_TOKEN,
            no: 10
        },
        verification: {
            method: 'get',
            params: {
                input_token: this.access_token,
                access_token: `${this.clientId}|${this.clientSecret}`
            },
            uri: FacebookURI.VERIFICATION,
            no: 12
        },
        fetchUser: {
            method: 'get',
            params: {
                fields: 'name,birthday,email,hometown',
                access_token: this.access_token
            },
            uri: (this.data && this.data.user_id) ? `${FacebookURI.GRAPH_API}${this.data.user_id}/` : '',
            no: 12
        }
    }

    constructor(data?: any) {
        super(data)
        if (!data) data = {}

        this.scope = data.scope || ''
        this.name = data.name || 'Facebook'
        this.state = data.state || 'facebook'
        this.requestStepList = ['accessToken', 'verification', 'fetchUser']
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
            state: this.state,
            access_token: this.access_token,
            expires_in: this.expires_in,
            token_type: this.token_type,
            data: this.data
        }
    }

    get loginDisplayObject(): object {
        return this.getPickRequest([
            'redirect_uri',
            'response_type',
            'scope',
            'state'
        ])
    }

    get callBackDisplayObject(): object {
        return this.getPickRequest([
            'code',
            'state',
            'redirect_uri',
            'access_token',
            'expires_in',
            'token_type',
            'data'
        ])
    }

    get requestTokenParams() {
        return this.getPickRequest([
            'code',
            'client_id',
            'client_secret',
            'redirect_uri'
        ])
    }

    get verificationParams() {
        return {
            input_token: this.access_token,
            access_token: `${this.clientId}|${this.clientSecret}`
        }
    }

    get fetchUserParams() {
        return {
            fields: 'name,birthday,email,hometown',
            access_token: this.access_token
        }
    }

    get loginURI(): string {
        return `${FacebookURI.LOGIN}?${this.getLoginQuery()}`
    }

    get requestParams() {
        if (this.requestStep === 'accessToken') {
            return this.requestTokenParams
        }
        if (this.requestStep === 'verification') {
            return this.verificationParams
        }
        if (this.requestStep === 'fetchUser') {
            return this.fetchUserParams
        }
    }

    getLoginQuery() {
        const params = this.getPickRequest([
            'client_id',
            'redirect_uri',
            'state'
        ])
        return queryString.stringify(params)
    }

    get isSetParams(): boolean {
        return this.requestStep !== 'fetchUser'
    }
}
