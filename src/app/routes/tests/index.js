module.exports = function attachHandlers(router){
   router.get('/tests', tests);
};

function tests(req, res){
    res.render('tests/index');
}

