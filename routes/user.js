var router = require('express').Router();
var sequelize = require('../db.js');
var User = sequelize.import('../models/user');
var bcrypt=require('bcryptjs');
var jwt = require('jsonwebtoken');
router.post('/', function(req, res) {
    // when we post to the api user, it will want a user in the object body
    var username = req.body.user.username;
    var pass = req.body.user.password; //TODOL hash this password -HASH=not human readable
    //Need to create a user object and use sequelize to put that user into

    // match the model we create above
    //Sequelize-take the user model and go out to the db and create this 
    User.create({
        username: username,
        passwordhash: bcrypt.hashSync(pass, 10)
    }).then(
        //Sequelize is going to retrun the object it created from the db.
        function createSucess(user){
            var token = jwt.sign({id:user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24})
            // successful get this
            res.json({
                user: user,
                message: 'create',
                sessionToken: token
            });
        },
        function createError(err){
            res.send(500, err.message);
        }
    );
});

module.exports = router;