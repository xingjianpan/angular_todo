var users = require('../../app/controllers/users.server.controller'),
	articles = require('../../app/controllers/articles.server.controller');

module.exports = function(app) {
  app.route('/api/articles')
  	.post(users.requiresLogin, articles.create)
    // .post(articles.create)
  	.get(articles.list);

  app.route('/api/articles/:articleId')
     .get(articles.read)
     .put(users.requiresLogin, articles.hasAuthorization,articles.update)
     // .put(articles.update)
     .delete(users.requiresLogin, articles.hasAuthorization,articles.delete);
     // .delete(articles.delete);

  //map function artcicles.articleById to path articleId    
  app.param('articleId', articles.articleByID);


};

