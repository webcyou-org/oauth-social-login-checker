import { GRANT } from '../const/grant_type'
import { pick } from 'lodash'

export class Provider {
    public name: string
    public clientId: string
    public clientSecret: string
    public consumerKey: string
    public consumerSecret: string
    public redirectUri: string
    public responseType: string
    public grantType: string
    public scope: string
    public state: string
    public code: string
    public nonce: string
    public requestStep: string = ''
    public requestStepList: string[] = ['requestToken']
    public requestStepHistoryList: string[] = []

    // response
    public access_token: string | null = null
    public expires_in: string | null = null
    public token_type: string | null = null
    public id_token: string | null = null

    constructor(data?: any) {
        if (!data) data = {}

        this.name = data.name || ''
        this.clientId = data.client_id || data.clientId || ''
        this.clientSecret = data.client_secret || data.clientSecret || ''
        this.consumerKey = data.consumer_key || data.consumerKey || ''
        this.consumerSecret = data.consumer_secret || data.consumerSecret || ''
        this.redirectUri = data.redirect_uri || 'http://localhost:3000/callback'
        this.responseType = data.response_type || 'code'
        this.grantType = data.grantType || GRANT.TYPE.AUTHORIZATION_CODE.VALUE
        this.scope = data.scope || ''
        this.state = data.state || ''
        this.code = data.code || ''
        this.nonce = data.nonce || ''
    }

    get toRequest(): any {
        return {}
    }

    isRequestStep(step: string): boolean {
        return this.requestStep === step
    }

    get idName() {
        return this.name.toLowerCase()
    }

    getPickRequest(pickList: string[]): object {
        return pick(this.toRequest, pickList)
    }
}
