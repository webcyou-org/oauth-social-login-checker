export class Provider {
    public name: string

    constructor(data?) {
        if (!data) data = {}
        this.name = data.name ? data.name : ''
    }
}
