module.exports = {
    entry: 'src/index.js',
    publicPath: './',
    proxy: {
        '/admin-api': {
            enable: true,
            target: 'http://10.188.0.46:8080',
            // target: 'http://127.0.0.1:8080',
        },
    },
    plugins: [
        ['ice-plugin-fusion', {}],
        ['ice-plugin-moment-locales', {
            locales: ['zh-cn'],
        }],
        ['ice-plugin-css-assets-local', {
            outputPath: 'assets',
            relativeCssPath: '../'
        }],
    ],
};
