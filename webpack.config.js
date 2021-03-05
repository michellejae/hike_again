const path = require('path');

module.exports = {

    context: path.resolve(__dirname, 'src'),
    entry: './index.js',
    output: {
        path: path.resolve(__dirname, '/public'),
        filename: '[name].bundle.js'
    }

}