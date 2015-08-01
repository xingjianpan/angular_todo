var app = require('../../server'),
    request = require('supertest'),
    should = require('should'),
    mongoose = require('mongoose'),
    Task = mongoose.model('Task'),
    User = mongoose.model('User')


var task, user;

describe('Task Model Unit Tests:', function() {
  beforeEach(function(done) {
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      email: 'test@test.com',
      username: 'username',
      password: 'password'
    });

    user.save(function() {
      task = new Task({
 
        content: 'Task Content',
        dueDate: '12/10/1990',
        creator: user
      });

      task.save(function(err) {
        done();
      });
    });
  });

  describe('Testing the GET methods', function() {
    it('Should be able to get the list of tasks', function(done){
      request(app).get('/api/tasks/')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
          res.body.should.be.an.Array.and.have.lengthOf(1);
          // res.body[0].should.have.property('dueDate', task.dueDate);
          res.body[0].should.have.property('content', task.content);

          done();
        });
    });

    it('Should be able to get the specific task', function(done) {
      request(app).get('/api/tasks/' + task.id)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
          res.body.should.be.an.Object.and.have.property('content', task.content);
          // res.body.should.have.property('dueDate', task.dueDate);

          done();
        });
    });
  });



 




  describe('Testing the POST methods', function() {
    it('Should be able to create new task', function(done){
      request(app).post('/api/tasks/')
        .set('Accept', 'application/json')
        .send({
               content: "Test string.",
               dueDate:"2013-1-1"
             })
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
          res.body.should.be.an.Object;
          res.body.should.have.property('content', "Test string.");
          // res.body.should.have.property('dueDate', "2013-1-1");

          done();
        });
    });

   });



  describe('Testing the PUT methods', function() {
    it('Should be able to update existing task', function(done){
      request(app).put('/api/tasks/' + task.id)
        .set('Accept', 'application/json')
        .send({
               content: "Updated Test string.",
               dueDate:"2013-1-1"
             })
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
          res.body.should.be.an.Object;
          res.body.should.have.property('content', "Updated Test string.");
          // res.body.should.have.property('dueDate', "2013-1-1");

          done();
        });
    });

   });



  describe('Testing the DELETE methods', function() {
    it('Should be able to delete and existing task', function(done){
      request(app).delete('/api/tasks/' + task.id)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
          res.body.should.be.an.Object;
          // res.body.should.have.property('dueDate', "2013-1-1");

          done();
        });
    });

   });









  afterEach(function(done) {
    Task.remove().exec();
    User.remove().exec();
    done();
  });
});