exports.render = function(req, res) {
  res.render('index', {
    title: 'Hello World!',
    user: JSON.stringify(req.user)
  });
}; 

// exports.render = function(req,res ){
// 	if (req.session.lastVisit) {
//     console.log(req.session.lastVisit);
//  	 }

//   req.session.lastVisit = new Date();

  
// 	res.render('index',{
// 		title:'hello world from swig',
// 		name:'xingjian pan from swig',
// 		userFullName: req.user ? req.user.fullName : '',
// 		u:req.user
// 	})

// 	console.log(req.hostname);
// 	console.log(req.ip);
// 	console.log(req.cookies);
// 	console.log(req.params);
// 	//get ?name=xingjian part from url
// 	console.log(req.query);
// 	console.log(req.query['name']);
// };


exports.me = function(req, res){


	res.send('xingjian pan is my name');
};

exports.test_post = function(req, res){
	res.send('get a post');
};


exports.test_swig =function(req, res){

	if (req.session.lastVisit) {
    console.log(req.session.lastVisit);
 	 }

  req.session.lastVisit = new Date();

  
	res.render('test_swig',{
		title:'hello world from swig',
		name:'xingjian pan from swig'
	})
};