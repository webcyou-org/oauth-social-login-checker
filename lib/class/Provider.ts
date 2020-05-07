import { GRANT } from '../const/grant_type'

export class Provider {
    public name: string
    public clientId: string
    public clientSecret: string
    public redirectUri: string
    public responseType: string
    public grantType: string
    public scope: string
    public state: string
    public nonce: string

    constructor(data?: any) {
        if (!data) data = {}

        this.name = data.name || ''
        this.clientId = data.client_id || ''
        this.clientSecret = data.client_secret || ''
        this.redirectUri = data.redirect_uri || 'http://localhost:3000/callback'
        this.responseType = data.response_type || 'code'
        this.grantType = data.grantType || GRANT.TYPE.AUTHORIZATION_CODE.VALUE
        this.scope = data.scope || ''
        this.state = data.state || ''
        this.nonce = data.nonce || ''
    }
}
