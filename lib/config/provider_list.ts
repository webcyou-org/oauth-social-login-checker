import { Facebook } from '~/lib/class/provider/Facebook'
import { GitHub } from '~/lib/class/provider/GitHub'
import { Google } from '~/lib/class/provider/Google'
import { Twitter } from '~/lib/class/provider/Twitter'

export const providerList: string[] = ['Google', 'Facebook', 'Twitter', 'GitHub']

export const ProviderMap: any = {
    facebook: Facebook,
    github: GitHub,
    google: Google,
    twitter: Twitter
}
