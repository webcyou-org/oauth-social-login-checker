import { Provider } from '../Provider'
import { OAuth } from '../OAuth'
import { TwitterURI } from '~/lib/enum/end_point_list'
import { pick } from 'lodash'

export class Twitter extends Provider {
    public oauth: OAuth

    public oauth_callback_confirmed: any = null
    public oauth_token: any = null
    public oauth_token_secret: any = null
    public oauth_verifier: any = null

    constructor(data?: any) {
        super(data)
        if (!data) data = {}

        this.scope = data.scope || ''
        this.name = data.name || 'Twitter'
        this.requestStepList = ['fetchUser']
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
            oauth_token_secret: this.oauth_token_secret,
            oauth_verifier: this.oauth_verifier
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

    get callBackDisplayObject(): object {
        return this.getPickRequest([
            'oauth_token',
            'oauth_verifier'
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

    get fetchUserParams() {
        const parameters: any = this.oauth.getOAuth1Params({
            oauth_consumer_key: this.consumerKey,
            oauth_token: this.oauth_token
        })
        const oAuthSignature = this.oauth.getOAuth1Signature({
            url: TwitterURI.FETCH_USER,
            consumerSecret: this.consumerSecret,
        }, parameters, this.oauth_verifier)
        return {
            headers: {
                Authorization: `OAuth oauth_consumer_key="${this.consumerKey}",oauth_token="${this.oauth_token}",oauth_signature_method="HMAC-SHA1",oauth_timestamp="${parameters.oauth_timestamp}",oauth_nonce="${parameters.oauth_nonce}",oauth_version="1.0",oauth_signature="${oAuthSignature}"`
            }
        }
    }

    get accessTokenParams() {
        return {
            oauth_token: this.oauth_token,
            oauth_verifier: this.oauth_verifier
        }
    }

    get loginURI(): string {
        return `${TwitterURI.LOGIN}?oauth_token=${this.oauth_token}&oauth_callback=http%3A%2F%2Flocalhost%3A3000%2Fcallback`
    }

    get requestParams() {
        if (this.requestStep === 'requestToken') {
            return this.requestTokenParams
        }
        if (this.requestStep === 'accessToken') {
            return this.accessTokenParams
        }
        if (this.requestStep === 'fetchUser') {
            return this.fetchUserParams
        }
    }

    get requestURI() {
        if (this.requestStep === 'requestToken') {
            return TwitterURI.REQUEST_TOKEN
        }
        if (this.requestStep === 'accessToken') {
            return TwitterURI.ACCESS_TOKEN
        }
        if (this.requestStep === 'fetchUser') {
            // todo: error "Could not authenticate you","code":32
            // 'content-type': 'application/x-www-form-urlencoded',
            // ?include_email=true&skip_status=true&include_entities=false
            return TwitterURI.VERIFY_CREDENTIALS
        }
    }

    get requestMethod() {
        if (this.requestStep === 'requestToken' || this.requestStep === 'fetchUser') {
            return 'get'
        }
        if (this.requestStep === 'accessToken') {
            return 'post'
        }
    }

    getPickRequest(pickList: string[]): object {
        return pick(this.toRequest, pickList)
    }
}
