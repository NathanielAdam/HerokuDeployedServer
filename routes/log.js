var router = require('express').Router();
var sequelize = require('../db');
var Log = sequelize.import('../models/log.js');
var User = sequelize.import('../models/user.js');
var Definition = sequelize.import('../models/definitions.js');

router.post('/', function(req, res) {
    //req has some body properties that have username and pwd
    var description = req.body.log.desc;
    var result = req.body.log.result;
    var user = req.user;
    var definition = req.body.log.def;
    Log
    .create({
        description: description,
        result: result,
        owner: user.id,
        def: definition
    })
    .then(
        function createSucess(log) {
            res.json(log);
        },
            function createError(err){
                res.send(500, err.message);
            }
    )
})
router.get('/', function(req, res) {
    var userid = req.user.id;
    Log.findAll({
        where: {owner: userid}
    })
    .then(
        function findAllSucess(data){
            //console.log(data);
            res.json(data)
        },
        function findAllError(err) {
            res.send(500, err.message)
        }
    )
})
//this will retrueve on workout specified bt the log id
router.get('/:id', function(req, res) {
    var data = req.params.id;
    //console.log(data); here for texting purposes
    Log
        .findOne({
            where: { id: data }
        }).then(
            function getSucess(updateData){
                res.json(updateData);
            },
            function getError(err){
                res.send(500, err.message);
            }
        )
})
router.put('/', function(req, res) {
    var description = req.body.log.desc;
    var result = req.body.log.result;
    var data = req.body.log.id;
    var definition = req.body.log.def;
    console.log(req);
    Log 
        .update(
        {
            description: description,
            result: result,
            def: definition
        },
        {where: {id: data}}
    ).then( 
        function updateSuccess(updatedLog) {
            res.json(updatedLog);
        }, 

        function updateError(err){
            res.send(500, err.message);
        }
    )
})
router.delete('/', function(req, res) {
    var data = req.body.log.id;
    Log 
    .destroy({
        where: { id: data }
    }).then(
        function deletLogSuccess(data) {
            res.send("you removed a log");
        },
        function deletLogError(err){
            res.send(500, err.message);
        }
    )
})
module.exports = router;