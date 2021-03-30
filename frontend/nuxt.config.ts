import { NuxtConfig } from '@nuxt/types';
import { MetaInfo } from 'vue-meta';


const config: NuxtConfig = {
    telemetry: false,
    build: {
        parallel: true,
        postcss: {
            plugins: {
                'postcss-nested': {

                }
            },
            preset: {
                autoprefixer: {
                    grid: process.env.NODE_ENV === 'production' ? 'autoplace' : false
                }
            }
        }
    },

    /*
    ** Nuxt target
    ** See https://nuxtjs.org/api/configuration-target
    */
    target: 'server',

    /*
    ** Headers of the page
    ** See https://nuxtjs.org/api/configuration-head
    */
    head() {
        // const meta: MetaInfo['meta'][] = [];

        if (process.server) {
            // meta.push({ hid: 'og:image', name: 'og:image', content: `//${ this.context.req.headers.host }/social.jpg` });
        }

        return {
            title: this.$store.getters['page/metaTitle'] || 'App',
            meta: [
                { charset: 'utf-8' },
                { name: 'viewport', content: 'width=device-width, initial-scale=1' },
                ...this.$store.getters['page/metaInfo']
                // ...meta
            ],
            link: [
                { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
            ]
        };
    },

    /*
    ** Global CSS
    */
    css: [],

    /*
    ** Plugins to load before mounting the App
    ** https://nuxtjs.org/guide/plugins
    */
    plugins: [
        '~/plugins/page.ts',
        '~/plugins/axios.ts',
        '~/plugins/layer/layer.client.js',
        '~/plugins/storage.js',
        '~/plugins/uuid.js'
    ],

    /*
    ** Auto import components
    ** See https://nuxtjs.org/api/configuration-components
    */
    components: [
        '~/components',
        { path: '~/components/layers/', global: true }
    ],

    /*
    ** Nuxt.js dev-modules
    */
    buildModules: [
        '@nuxt/typescript-build',
        // Doc: https://github.com/nuxt-community/eslint-module
        '@nuxtjs/eslint-module',
        '@nuxtjs/tailwindcss',
        '@nuxtjs/svg'
    ],

    /*
    ** Nuxt.js modules
    */
    modules: [
        // Doc: https://axios.nuxtjs.org/usage
        '@nuxtjs/axios',
        'nuxt-user-agent',
        '@nuxtjs/sentry'
    ],

    /*
    ** Axios module configuration
    ** See https://axios.nuxtjs.org/options
    */
    axios: {},

    /*
    ** Content module configuration
    ** See https://content.nuxtjs.org/configuration
    */
    content: {},

    /*
    ** Build configuration
    ** See https://nuxtjs.org/api/configuration-build/
    */

    router: {
        middleware: ['page'],
        trailingSlash: true,
        prefetchLinks: false
    },

    sentry: {
        dsn: process.env.SSR_SENTRY_DSN || process.env.CLIENT_SENTRY_DSN || '',
        clientConfig: {
            dsn: process.env.CLIENT_SENTRY_DSN || ''
        }
    },

    tailwindcss: {
        exposeConfig: true
    }
};


export default config;
