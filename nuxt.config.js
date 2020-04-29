module.exports = {
    mode: 'spa',
    head: {
        title: process.env.npm_package_name || '',
        meta: [
            { charset: 'utf-8' },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1'
            },
            {
                hid: 'description',
                name: 'description',
                content: process.env.npm_package_description || ''
            }
        ],
        link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
    },
    loading: { color: '#fff' },
    css: [],
    plugins: [],
    buildModules: [
        '@nuxt/typescript-build',
        // Doc: https://github.com/nuxt-community/stylelint-module
        '@nuxtjs/stylelint-module'
    ],
    modules: [
        // Doc: https://axios.nuxtjs.org/usage
        '@nuxtjs/axios',
        '@nuxtjs/pwa'
    ],
    axios: {},
    build: {
        babel: {
            plugins: [
                'transform-decorators-legacy',
                'transform-class-properties'
            ]
        }
        // extend(config, ctx) {}
    }
}