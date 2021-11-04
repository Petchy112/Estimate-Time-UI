

export default {
    // Global page headers: https://go.nuxtjs.dev/config-head
    target: 'static',
    head: {
        titleTemplate: '%s',
        title: 'Estimate Time',
        htmlAttrs: {
            lang: 'html'
        },
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=0' },
            { hid: 'description', name: 'description', content: '' },
            { name: 'format-detection', content: 'telephone=no' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
            { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Mitr:wght@200;400;600&display=swap' }
        ],
        script: [
            { src: "https://static.line-scdn.net/liff/edge/2.1/sdk.js" }
        ]
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [ ],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [
    ],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
    // https://go.nuxtjs.dev/eslint
        '@nuxtjs/eslint-module',
        // https://go.nuxtjs.dev/vuetify
        '@nuxtjs/vuetify',
    ],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
    // https://go.nuxtjs.dev/axios
        '@nuxtjs/axios',
    ],

    // Axios module configuration: https://go.nuxtjs.dev/config-axios
    axios: {},

    // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
    vuetify: {
        customVariables: [ '~/styles/variables.scss' ],
    },
    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {
    }
}
