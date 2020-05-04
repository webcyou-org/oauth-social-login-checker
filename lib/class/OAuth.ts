import { GRANT } from '../const/grant_type'
import { FLOW } from '../const/flow_type'

export class OAuth {
    public version: string
    public grantType: string
    public flowType: string

    constructor(data?: any) {
        if (!data) data = {}

        this.version = data.version || '2.0'
        this.grantType = data.grantType || GRANT.TYPE.AUTHORIZATION_CODE.VALUE
        this.flowType = data.flowType || FLOW.TYPE.AUTHORIZATION_CODE.VALUE
    }
}
