import { Provider } from '../Provider'
import { OAuth } from '../OAuth'

export class Google extends Provider {
    public oauth: OAuth
    public code: string

    constructor(data?: any) {
        super(data)

        this.code = data.code || ''
        this.scope = data.scope || 'openid profile'
        this.state = data.state || 'google'
        this.oauth = new OAuth()
    }
}
