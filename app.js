require('dotenv').config();
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var sequelize = require('./db');
var User= sequelize.import(__dirname + '\\models\\user')

// build user model
   
// User.sync();
// sequelize.sync({force:true});
sequelize.sync();
app.use(bodyParser.json());

app.use(require('./middleware/headers'))
app.use(require('./middleware/validate-session'))
app.use('/api/user', require('./routes/user'));
app.use('/api/login', require('./routes/session'))
app.use('/api/definition', require('./routes/definitions'))
app.use('/api/log', require('./routes/log'))
// grab the middleware/headers form headers.js
// app.use('/api/definition', require('./routes/log'))
// test the api and see if we can send a get request

app.use('/api/test', function(req,res){
    res.send('Hello World')
});

// open server on port 3000
app.listen(3000, function(){
    console.log("app is open on 3000!")
})