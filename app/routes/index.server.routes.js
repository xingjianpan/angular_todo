module.exports = function(app) {

	//decalre index route
    var index = require('../controllers/index.server.controller');

    //map '/' to index.render
    app.get('/', index.render);
    app.get('/me', index.me);
    app.post('/test_post', index.test_post);
    app.get('/test_swig', index.test_swig);
};