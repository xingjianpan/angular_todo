//  Use connect as server

// var connect=require('connect');
// var app = connect();


// var helloWorld = function(req,res,next){
// 	res.end('hellow world')
// };


// app.use('/', helloWorld);


// app.listen(3000);
// console.log('server listenting at port 3000');



// Use express as server
// var express = require('express');
// var app = express();


// // 下面这句话如果按照MVC模式怎么写？
// // 如果用swigy模板怎么写？

// app.get('/name', function(req, res){
// 	res.send('name is xingjianpan');
// 	console.log(req.params);
// 	console.log('req.param: '+ req.param('name'));
// 	console.log('query: '+ req.query['name']);


// });


// app.use('/', function(req,res){
// 	res.send('hello world from Express!');

// 	console.log(req.hostname);
// 	console.log(req.ip);
// 	console.log(req.cookies);
// 	console.log(req.params);
// 	//get ?name=xingjian part from url
// 	console.log(req.query);
// 	console.log(req.query['name']);

// });


// app.listen(3000);
// console.log('server listenting at port 3000');

 

process.env.NODE_ENV = process.env.NODE_ENV || 'development';


// var express = require('express');

var mongoose = require('./config/mongoose'),
	express = require('./config/express');
var passport = require('./config/passport');


// load db
var db = mongoose();
// var app = express();
var app = express();


//实际上下面这句话会调用config/passport文件中module.exports = function()部分

var passport = passport();


app.listen(3000);
module.exports = app;

console.log('Server running at http://localhost:3000/');