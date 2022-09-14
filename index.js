var express = require("express");
var app     = express();
const path = require('path')
// Static Files
app.use(express.static(__dirname))

app.get('/', (req, res) => {
    res.sendFile( path.join( __dirname, 'index.html' ) )
    })

app.use(express.static( path.join( __dirname, 'public', 'static')))

app.listen(process.env.PORT || 5000)
