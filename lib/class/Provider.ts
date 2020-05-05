export class Provider {
    public name: string
    public clientId: string
    public redirectUri: string
    public responseType: string
    public scope: string
    public state: string
    public nonce: string

    constructor(data?: any) {
        if (!data) data = {}

        this.name = data.name || ''
        this.clientId = data.client_id || ''
        this.redirectUri = data.redirect_uri || 'http://localhost:3000/callback'
        this.responseType = data.response_type || ''
        this.scope = data.scope || ''
        this.state = data.state || ''
        this.nonce = data.nonce || ''
    }
}
