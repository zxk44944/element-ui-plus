const fs = require('fs')
const path = require('path')

const fileList = fs.readdirSync(path.join(__dirname, 'pages'))
export default fileList
