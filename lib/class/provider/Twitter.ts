import { Provider } from '../Provider'
import { OAuth } from '../OAuth'

import { TwitterURI } from '~/lib/enum/end_point_list'

import { pick } from 'lodash'

export class Twitter extends Provider {
    public oauth: OAuth

    public oauth_callback_confirmed: any = null
    public oauth_token: any = null
    public oauth_token_secret: any = null

    constructor(data?: any) {
        super(data)
        if (!data) data = {}

        this.scope = data.scope || ''
        this.name = data.name || 'Twitter'
        this.requestStepList =  data.requestStepList || ['accessToken']
        this.redirectUri = data.redirect_uri || 'http://localhost:3000/callback/twitter'
        this.oauth = new OAuth()
    }

    get toRequest(): any {
        return {
            code: this.code,
            client_id: this.clientId,
            client_secret: this.clientSecret,
            redirect_uri: this.redirectUri,
            grant_type: this.grantType,
            oauth_callback_confirmed: this.oauth_callback_confirmed,
            oauth_token: this.oauth_token,
            oauth_token_secret: this.oauth_token_secret
        }
    }

    get loginDisplayObject(): object {
        return this.getPickRequest([
            'redirect_uri'
        ])
    }

    get loginDisplayResponseDataObject(): object {
        return this.getPickRequest([
            'oauth_callback_confirmed',
            'oauth_token',
            'oauth_token_secret'
        ])
    }

    get requestTokenParams() {
        const parameters: any = this.oauth.getOAuth1Params({
            oauth_consumer_key: this.consumerKey
        })

        const oAuthSignature = this.oauth.getOAuth1Signature({
            url: `${TwitterURI.DOMAIN}/oauth/request_token`,
            consumerSecret: this.consumerSecret
        }, parameters)

        return {
            headers: {
                Authorization: `OAuth oauth_consumer_key="${this.consumerKey}",oauth_signature_method="HMAC-SHA1",oauth_timestamp="${parameters.oauth_timestamp}",oauth_nonce="${parameters.oauth_nonce}",oauth_version="1.0",oauth_signature="${oAuthSignature}"`
            }
        }
    }

    get loginURI(): string {
        return `${TwitterURI.DOMAIN}/oauth/authenticate?oauth_token=${this.oauth_token}&oauth_callback=http%3A%2F%2Flocalhost%3A3000%2Fcallback`
    }

    get requestParams() {
        if (this.requestStep === 'requestToken') {
            return this.requestTokenParams
        }
    }

    get requestURI() {
        if (this.requestStep === 'requestToken') {
            return TwitterURI.REQUEST_TOKEN
        }
    }

    get requestMethod() {
        if (this.requestStep === 'requestToken') {
            return 'get'
        }
    }

    getPickRequest(pickList: string[]): object {
        return pick(this.toRequest, pickList)
    }
}
