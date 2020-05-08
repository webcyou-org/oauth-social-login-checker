import { Provider } from '../Provider'
import { OAuth } from '../OAuth'

import { GitHubURI } from '~/lib/enum/end_point_list'

import { pick } from 'lodash'
import queryString from 'query-string'

export class GitHub extends Provider {
    public oauth: OAuth
    public code: string
    public allowSignup: string

    constructor(data?: any) {
        if (!data) data = {}
        super(data)

        this.code = data.code || ''
        this.scope = data.scope || 'user'
        this.name = data.name || 'GitHub'
        this.state = data.state || 'github'
        this.allowSignup = data.allow_signup || ''
        this.oauth = new OAuth()

        console.log(this)
    }

    get toRequest(): any {
        return {
            code: this.code,
            client_id: this.clientId,
            client_secret: this.clientSecret,
            redirect_uri: this.redirectUri,
            grant_type: this.grantType,
            scope: this.scope,
            state: this.state
        }
    }

    get loginDisplayObject(): object {
        return {
            redirect_uri: this.redirectUri,
            scope: this.scope,
            state: this.state,
            allow_signup: this.allowSignup
        }
    }

    get loginURI(): string {
        return `${GitHubURI.LOGIN}?${this.getLoginQuery()}`
    }

    getLoginQuery() {
        const params = this.getPickRequest([
            'client_id',
            'scope',
            'state'
        ])
        return queryString.stringify(params)
    }

    getPickRequest(pickList: string[]): object {
        return pick(this.toRequest, pickList)
    }

    login() {
        location.href = this.loginURI
    }
}
