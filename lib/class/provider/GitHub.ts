import { Provider } from '../Provider'
import { OAuth } from '../OAuth'

import { pick } from 'lodash'

export class GitHub extends Provider {
    public oauth: OAuth
    public code: string

    constructor(data?: any) {
        if (!data) data = {}
        super(data)

        this.code = data.code || ''
        this.scope = data.scope || ''
        this.name = data.name || 'GitHub'
        this.state = data.state || 'github'
        this.oauth = new OAuth()
    }

    get toRequest(): any {
        return {
            code: this.code,
            client_id: this.clientId,
            client_secret: this.clientSecret,
            redirect_uri: this.redirectUri,
            grant_type: this.grantType
        }
    }

    getPickRequest(pickList: string[]): object {
        return pick(this.toRequest, pickList)
    }
}
