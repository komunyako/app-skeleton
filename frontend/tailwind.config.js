module.exports = {
    corePlugins: {
        container: false
    },
    theme: {
        extend: {
            fontSize: {
            },
            colors: {
            },
            spacing: {
            }
        },
        fontFamily: {
        },
        screens: {
            xl: { max: '1200px' },
            lg: { max: '1000px' },
            md: { max: '750px' },
            sm: { max: '600px' },
            'a-sm': { min: '601px' },
            'a-md': { min: '751px' },
            'a-lg': { min: '1001px' },
            'a-xl': { min: '1201px' }
        }
    },
    purge: {
        enabled: process.env.NODE_ENV === 'production',
        content: [
            './components/**/*.vue',
            './layouts/**/*.vue',
            './pages/**/*.vue',
            './mixins/**/*.{js,ts}',
            './helpers/**/*.{js,ts}',
            './plugins/**/*.{js,ts}',
            './nuxt.config.{js,ts}'
        ]
    }
};
