export class AlertMessage {
    public id: string
    public type: string
    public message: string
    public isShow = true

    constructor(data?: any) {
        if (!data) data = {}
        this.id = String(new Date().getTime())
        this.type = data.type ? data.type : 'success'
        this.message = data.message ? data.message : ''
    }
}
