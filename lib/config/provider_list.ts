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
