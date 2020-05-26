export const LOCAL_STORAGE_KEY = 'oauth-app'

export class Storage {
    public type: string
    public data: any

    constructor(data?: any) {
        if (!data) data = {}

        this.type = data.type || 'none'
        this.data = data.data || {}

        if (localStorage.getItem(LOCAL_STORAGE_KEY)) {
            const localStorageData: any = localStorage.getItem(LOCAL_STORAGE_KEY)
            const appData: any = JSON.parse(localStorageData)
            this.type = appData.type

            if (this.type === 'localStorage') {
                this.data = appData.data
            }
        }
    }

    isProvider(name: string): boolean {
        return Boolean(this.getProvider(name))
    }

    getProvider(name: string) {
        const localStorageData: any = localStorage.getItem(LOCAL_STORAGE_KEY)
        const appData: any = JSON.parse(localStorageData)
        if (!appData) return null

        return appData.data[name.toLowerCase()]
    }
}