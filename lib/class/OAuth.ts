import { GRANT } from '../const/grant_type'
import { FLOW } from '../const/flow_type'
import { ResponseType } from '../enum/response_type'

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
}
