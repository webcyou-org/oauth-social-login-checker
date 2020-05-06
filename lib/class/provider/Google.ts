import { Provider } from '../Provider'
import { OAuth } from '../OAuth'

export class Google extends Provider {
    public oauth: OAuth

    constructor(data?: any) {
        super(data)

        this.scope = data.scope || 'openid profile'
        this.state = data.state || 'google'
        this.oauth = new OAuth()
    }
}
