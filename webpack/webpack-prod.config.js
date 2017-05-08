module.exports = require('./webpack.config.js')({
    isProduction: true,
    jsFileName: 'app.[hash].js',
    cssFileName: 'app.[hash].css',
});