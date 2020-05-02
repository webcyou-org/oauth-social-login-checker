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
    css: ['@atomic-package/css/dist/atomic-package/atomic-package.css'],
    plugins: [],
    serverMiddleware: [{ path: '/api', handler: '~/server/index.js' }],
    proxy: {
        '/github/': {
            target: 'https://github.com/',
            pathRewrite: { '^/github/': '' }
        },
        '/github_api/': {
            target: 'https://api.github.com/',
            pathRewrite: { '^/github_api/': '' }
        },
        '/facebook/': {
            target: 'https://graph.facebook.com/',
            pathRewrite: { '^/facebook/': '' }
        },
        '/google_accounts/': {
            target: 'https://accounts.google.com/',
            pathRewrite: { '^/google_accounts/': '' }
        },
        '/google_oauth2/': {
            target: 'https://oauth2.googleapis.com/',
            pathRewrite: { '^/google_oauth2/': '' }
        }
    },
    buildModules: ['@nuxt/typescript-build', '@nuxtjs/stylelint-module'],
    modules: [
        // Doc: https://axios.nuxtjs.org/usage
        '@nuxtjs/axios',
        '@nuxtjs/proxy',
        '@nuxtjs/pwa'
    ],
    axios: {
        proxy: true
    },
    build: {
        // extend(config, ctx) {}
    }
}
