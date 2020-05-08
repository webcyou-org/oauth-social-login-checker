import { Provider } from '../Provider'
import { OAuth } from '../OAuth'

import { FacebookURI } from '~/lib/enum/end_point_list'

import { pick } from 'lodash'
import queryString from 'query-string'

export class Facebook extends Provider {
    public oauth: OAuth

    constructor(data?: any) {
        if (!data) data = {}
        super(data)

        this.scope = data.scope || ''
        this.name = data.name || 'Facebook'
        this.state = data.state || 'facebook'
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

    get loginDisplayObject(): object {
        return this.getPickRequest([
            'redirect_uri',
            'response_type',
            'scope',
            'state'
        ])
    }

    get loginURI(): string {
        return `${FacebookURI.LOGIN}?${this.getLoginQuery()}`
    }

    getLoginQuery() {
        const params = this.getPickRequest([
            'client_id',
            'redirect_uri',
            'state'
        ])
        return queryString.stringify(params)
    }

    getPickRequest(pickList: string[]): object {
        return pick(this.toRequest, pickList)
    }
}
