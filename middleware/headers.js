module.exports = function(req,res,next){
    // allows two origins to talk to one another
    res.header('access-control-allow-origin','*');
    res.header('access-control-allow-methods', 'GET,POST,PUT,DELETE');
    res.header('access-control-allow-headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    // returns the next item in a sequence, iterator function
    next();
}