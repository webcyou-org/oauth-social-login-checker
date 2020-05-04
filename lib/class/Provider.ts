export class Provider {
    public name: string
    public clientId: string

    constructor(data?: any) {
        if (!data) data = {}

        this.name = data.name || ''
        this.clientId = data.client_id || ''
    }
}
