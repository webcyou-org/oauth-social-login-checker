export class Provider {
    public name: string

    constructor(data?: any) {
        if (!data) data = {}
        this.name = data.name ? data.name : ''
    }
}
