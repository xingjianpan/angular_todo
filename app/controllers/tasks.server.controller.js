var Task = require('mongoose').model('Task');

var getErrorMessage = function(err) {
  if (err.errors) {
    for (var errName in err.errors) {
      if (err.errors[errName].message) return err.errors[errName].message;
    }
  } else {
    return 'Unknown server error';
  }
};



exports.list = function(req, res) {
  // console.log(req.user._id);
  // console.log(req.query);
  
  //build all the conditions used for search

  var conditions = {};
   

  if (req.query.priority){
      conditions.priority=req.query.priority;
  } 

  if (req.query.project){
      conditions.project=req.query.project;
  } 

  if (req.query.tag){
      conditions["tags.name"]={$in:[req.query.tag]};
  } 
 
  if (req.user){
    conditions["creator"]=req.user._id;
  }

 // db.tasks.find({"tags.name": { $in: ['@ab'] }})
 


  // console.log(conditions);

  Task.find(

      conditions
    
    ).sort('-created')
      .populate('creator', 'firstName   lastName fullName')
      .exec(function(err, task) {
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err)
      });
    } else {
      res.json(task);
    }
  });
};







//POST
exports.create = function(req, res) {
  var task = new Task(req.body);
  task.creator = req.user;

  


  //parse task, sepertae tags from content
  var content = req.body.content.split(' ');
  // console.log(req.body.content.split(" "));
  var content_ = [];
 
  for (var i=0; i<content.length; i++){
    //first character is @
    if (content[i][0] === '@'){
      task.tags.push({"name":content[i]});
      // console.log('tags: ' + task.tags);
    } else {
      content_.push(content[i]);
      // console.log('content: ' + content_);
    }
  }

  // console.log('final content: ' + content_.join(" "));
   
  
  task.content = content_.join(" ");

  
    //this will be showd in chrome console window 


    // console.log('-----');
    //   console.log(req.query);
    //   console.log('-----');
    console.log(task);

  task.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err)
      });
    } else {
      res.json(task);
    }
  });
};

 



//GET
exports.read = function(req, res) {
  res.json(req.task);
};


//PUT
exports.update = function(req, res) {
  var task = req.task;

  // console.log(req.body.rawContent);
 
  task.rawContent = req.body.rawContent;

  task.dueDate = req.body.dueDate;
  task.isDone = req.body.isDone;
  task.doneDate = Date.now();
 
  task.project = req.body.project;
  task.priority = req.body.priority;

  // console.log(task.tags);
  task.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err)
      });
    } else {
      res.json(task);
    }
  });
};

//DELETE
exports.delete = function(req, res) {
  var task = req.task;

  task.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err)
      });
    } else {
      res.json(task);
    }
  });
};


exports.taskByID = function(req, res, next, id) {
  Task.findById(id)
      .populate('creator', 'firstName lastName fullName')
      .exec(function(err, task) {
    if (err) return next(err);
    if (!task) return next(new Error('Failed to load task ' + id));

    req.task = task;
    next();
  });
};


exports.hasAuthorization = function(req, res, next) {
    if (req.task.creator.id !== req.user.id) {
        return res.status(403).send({
            message: 'User is not authorized'
        });
    }
    next();
};


 
 





// exports.listTags = function(req, res) {
//   console.log(req.user._id);
//   // console.log(req.query);
  
//   //build all the conditions used for search
 

//   Task.find(
//       {tags:{$note:{$size:0}}})
//       .select('tags')     
//      .exec(function(err, task) {
//     if (err) {
//       return res.status(400).send({
//         message: getErrorMessage(err)
//       });
//     } else {
//       res.json(task);
//     }
//   });
// };





