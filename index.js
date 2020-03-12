const express = require('express')
const app = express()

app.use('public', express.static('public'))

app.get('/', function (req, res) {
    res.send('Hello World!')
})

app.listen(3000, function () {
    console.log('Ouvindo a porta 3000!')
})