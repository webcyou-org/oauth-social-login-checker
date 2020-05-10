import { GRANT } from '../const/grant_type'
import { FLOW } from '../const/flow_type'
import { ResponseType } from '../enum/response_type'

const OAuthSignature = require('oauth-signature')

import { omit } from 'lodash'

export class OAuth {
    public version: string
    public grantType: string
    public flowType: string
    public scope: string

    constructor(data?: any) {
        if (!data) data = {}

        this.version = data.version || '2.0'
        this.grantType = data.grantType || GRANT.TYPE.AUTHORIZATION_CODE.VALUE
        this.flowType = data.flowType || FLOW.TYPE.AUTHORIZATION_CODE.VALUE
        this.scope = data.scope || ResponseType.code
    }

    getOpenIDFlowType(response_type: ResponseType) {
        let flowType = FLOW.TYPE.AUTHORIZATION_CODE
        switch (response_type) {
            case ResponseType.code:
                flowType = FLOW.TYPE.AUTHORIZATION_CODE
                break
            case ResponseType.id_token:
            case ResponseType.id_token_token:
                flowType = FLOW.TYPE.IMPLICIT
                break
            case ResponseType.code_id_token:
            case ResponseType.code_token:
            case ResponseType.code_id_token_token:
                flowType = FLOW.TYPE.HYBRID_FLOW
                break
        }
        return flowType
    }

    get randomString(): string {
        return Math.random().toString(32).substring(2)
    }

    get timestamp(): number {
        return Math.floor(Date.now() / 1000)
    }

    getOAuth1Params({ oauth_consumer_key, oauth_nonce, oauth_timestamp, oauth_signature_method = 'HMAC-SHA1', oauth_version = '1.0', oauth_token = null}: any): object {
        let parameters: any = {
            oauth_consumer_key,
            oauth_token,
            oauth_nonce: oauth_nonce || this.randomString,
            oauth_timestamp: oauth_timestamp || this.timestamp,
            oauth_signature_method,
            oauth_version
        }
        if (!parameters.oauth_token) {
            return omit(parameters, ['oauth_token'])
        }
        return parameters
    }

    getOAuth1Signature({ httpMethod = 'GET', url, consumerSecret }: any, parameters: any, oauthVerifier: any = null) {
        let oAuthSignature = {}
        if (oauthVerifier) {
            oAuthSignature = OAuthSignature.generate(
                httpMethod,
                url,
                parameters,
                consumerSecret,
                oauthVerifier
            )
        } else {
            oAuthSignature = OAuthSignature.generate(
                httpMethod,
                url,
                parameters,
                consumerSecret
            )
        }
        return oAuthSignature
    }
}
