export class ErrorClass {
    public ecode: number
    public errorLists: string[]
    public message: string
    public userMessage: string // 400,503エラー等が発生した場合にユーザー向けに表示するメッセージ
    public svrt: number
    public txid: string
    public isSingle: boolean

    constructor(data?: any) {
        if (!data) data = {}
        this.ecode = data.ecode ? data.ecode : 0
        this.errorLists = data.errorLists ? data.errorLists : []
        this.message = data.message ? data.message : '予期せぬエラーが発生しました。'
        this.userMessage = data.userMessage ? data.userMessage : ''
        this.svrt = data.svrt ? data.svrt : 0
        this.txid = data.txid ? data.txid : ''
        this.isSingle = data.isSingle ? data.isSingle : false
    }
}
