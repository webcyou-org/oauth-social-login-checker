import { Facebook } from '~/lib/class/provider/Facebook'
import { GitHub } from '~/lib/class/provider/GitHub'
import { Google } from '~/lib/class/provider/Google'
import { Twitter } from '~/lib/class/provider/Twitter'

import { Storage } from '~/lib/class/Storage'

export const providerList: string[] = ['Google', 'Facebook', 'Twitter', 'GitHub']

export const ProviderMap: any = {
    facebook: Facebook,
    github: GitHub,
    google: Google,
    twitter: Twitter
}

export const createProvider = ({ name, data }: any) => {
    return new ProviderMap[name](data)
}

export const createProviderList = () => {
    const createdProviderList: any[] = []
    const storage = new Storage()

    providerList.forEach(provider => {
        const name = provider.toLowerCase()
        if (storage.isProvider(name)) {
            createdProviderList.push(
                createProvider({
                    name,
                    data: storage.getProvider(name)
                })
            )
        } else {
            createdProviderList.push(
                createProvider({
                    name,
                    data: {}
                })
            )
        }
    })
    return createdProviderList
}
