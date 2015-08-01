var users = require('../../app/controllers/users.server.controller'),
	tasks = require('../../app/controllers/tasks.server.controller');

module.exports = function(app) {
  app.route('/api/tasks')
  	 
    .post( tasks.create)
    // .post(users.requiresLogin,tasks.create)
  	.get( tasks.list);
 
 
    
  app.route('/api/tasks/:taskId')
     .get(tasks.read)
     // .put(users.requiresLogin, tasks.hasAuthorization,tasks.update)
     .put(tasks.update)
     // .delete(users.requiresLogin, tasks.hasAuthorization,tasks.delete);
     .delete(tasks.delete);

  //map function artcicles.articleById to path articleId    
  app.param('taskId', tasks.taskByID);


};

