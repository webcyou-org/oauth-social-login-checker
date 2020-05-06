import { Facebook } from '~/lib/class/provider/Facebook'
import { GitHub } from '~/lib/class/provider/GitHub'
import { Google } from '~/lib/class/provider/Google'
import { Twitter } from '~/lib/class/provider/Twitter'

export interface ProviderObject {
    name: string
    state: string
    iconClassName: string
}

export const providerList: ProviderObject[] = [
    {
        name: 'Google',
        state: 'google',
        iconClassName: 'ap-google'
    },
    {
        name: 'Facebook',
        state: 'facebook',
        iconClassName: 'ap-facebook'
    },
    {
        name: 'Twitter',
        state: 'twitter',
        iconClassName: 'ap-twitter'
    },
    {
        name: 'GitHub',
        state: 'github',
        iconClassName: 'ap-github'
    }
]

export const ProviderMap: any = {
    facebook: Facebook,
    github: GitHub,
    google: Google,
    twitter: Twitter
}
