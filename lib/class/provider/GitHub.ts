import { Provider } from '../Provider'
import { OAuth } from '../OAuth'
import { GitHubURI } from '~/lib/enum/end_point_list'
import { merge } from 'lodash'
import queryString from 'query-string'

export class GitHub extends Provider {
    public oauth: OAuth
    public allowSignup: string
    public requestData: any = {
        accessToken: {
            method: 'post',
            params: '',
            uri: GitHubURI.ACCESS_TOKEN,
            no: 10
        },
        fetchUser: {
            method: 'post',
            params: '',
            uri: GitHubURI.FETCH_USER,
            no: 12
        }
    }

    constructor(data?: any) {
        super(data)
        if (!data) data = {}

        this.scope = data.scope || 'user'
        this.name = data.name || 'GitHub'
        this.state = data.state || 'github'
        this.allowSignup = data.allow_signup || ''
        this.requestStepList = ['accessToken', 'fetchUser']
        this.oauth = new OAuth()
    }

    get toRequest(): any {
        return  {
            code: this.code,
            client_id: this.clientId,
            client_secret: this.clientSecret,
            redirect_uri: this.redirectUri,
            grant_type: this.grantType,
            scope: this.scope,
            state: this.state,
            allow_signup: this.allowSignup,
            access_token: this.access_token,
            token_type: this.token_type,
            id_token: this.id_token
        }
    }

    get loginDisplayObject(): object {
        return this.getPickRequest([
            'redirect_uri',
            'scope',
            'state',
            'allow_signup'
        ])
    }

    get callBackDisplayObject(): object {
        return this.getPickRequest([
            'code',
            'scope',
            'state',
            'access_token',
            'expires_in',
            'token_type'
        ])
    }

    get requestTokenParams() {
        const requestParams = this.getPickRequest([
            'code',
            'client_id',
            'client_secret'
        ])
        return merge(requestParams, {
            headers: {
                'Content-Type': 'application/json',
                accept: 'application/json'
            }
        })
    }

    get fetchUserParams() {
        return {
            headers: {
                Authorization: `token ${this.access_token}`
            }
        }
    }

    get loginURI(): string {
        return `${GitHubURI.LOGIN}?${this.getLoginQuery()}`
    }

    get requestParams() {
        if (this.requestStep === 'accessToken') {
            return this.requestTokenParams
        }
        if (this.requestStep === 'fetchUser') {
            return this.fetchUserParams
        }
    }

    get requestURI() {
        return this.requestData[this.requestStep].uri
    }

    get requestMethod() {
        return this.requestData[this.requestStep].method
    }

    getLoginQuery() {
        const params = this.getPickRequest([
            'client_id',
            'scope',
            'state'
        ])
        return queryString.stringify(params)
    }

    get isSetParams(): boolean {
        return this.requestStep !== 'fetchUser'
    }

    get stepNumber(): number {
        if (this.requestStep === '') {
            return 3
        }
        return this.requestData[this.requestStep].no
    }
}
