var router = require('express').Router();
var sequelize = require('../db');
var USER = sequelize.import('../models/user.js')
var Definition = sequelize.import('../models/definitions.js')

router.post('/', function(req, res){
    //variables
        var description = req.body.definition.desc;
        var logType = req.body.definition.type;
        var owner = req.user.id;

    //methods
    Definition
        .create({
            description: description,
            logType: logType,
            owner: owner
        })

        .then(
            //create Sucess function
                function createSucess(definition) {
                    //send response to json
                    res.json({
                        definition:definition
                    })
                },
                function createError(err) {
                    res.send(500, err.message)
                }

            //create error function


        )
})

router.get('/', function(req, res){
    //user variable
    var userid = req.user.id

    Definition
    //findall by owner method
    .findAll({
        where:{owner: userid}
    })
    .then(
        //sucess
        function findAllSucess(data) {
            //console.log(data)
            res.json(data);
        },
        //error
        function findAllError(err) {
            res.send(500, err.message)
        }
    );
});
module.exports = router;