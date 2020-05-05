export class Loading {
    public isShow: boolean

    constructor(data?: any) {
        if (!data) data = {}
        this.isShow = data.isShow ? data.isShow : false
    }
}
