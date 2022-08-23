/* proxy name etc /api must match backend endpoint etc /api */
const path = require('path')

module.exports = {
    outputDir: path.resolve(__dirname, '../server/public/'),
    devServer: {
        proxy: {
            '/api': { target: 'http://localhost:7070' }
        }
    }
}