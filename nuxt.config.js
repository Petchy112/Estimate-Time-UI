

export default {
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
    loading: [ '~/components/Loading.vue' ],
    css: [ 'reset-css/reset.css', 'toastr/build/toastr.min.css', ],

    plugins: [
        '~/plugin/validate.js',
        '~/plugin/createInstanceAPI.js',
        { src: '~/plugin/persist', ssr: false },


    ],
    components: true,

    buildModules: [
        '@nuxtjs/eslint-module',
        '@nuxtjs/vuetify',
    ],

    modules: [
        '@nuxtjs/axios',
        '@nuxtjs/style-resources',
    ],

    axios: {},

    vuetify: {
        customVariables: [ '~/styles/variables.scss' ],
    },
    styleResources: {
        scss: [
            '~styles/vars/*.scss'
        ]
    },
    router: {
        linkExactActiveClass: 'active-link',
        // middleware: [ 'authenticated' ]
    },
    build: {
    }
}
