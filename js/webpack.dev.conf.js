const {merge} = require('webpack-merge');
const baseConfig = require('./webpack.base.conf.js');

module.exports = merge(baseConfig, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        port: 3001,
        proxy: {
            '/api': {
                target: 'http://weather.test',
                changeOrigin: true
            },
            '/Uploads': {
                target: 'http://weather.test',
                changeOrigin: true
            },
            '/extends': {
                target: 'http://weather-t.tunnel.t4tstudio.com',
                changeOrigin: true
            }
        }
    }
});