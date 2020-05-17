export class OAuthFlow {
    public isShow: boolean
    public stepNumber: number

    constructor(data?: any) {
        if (!data) data = {}

        this.isShow = data.isShow ? data.isShow : false
        this.stepNumber = data.stepNumber ? data.stepNumber : 1
    }
}