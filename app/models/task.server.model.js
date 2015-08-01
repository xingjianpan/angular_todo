 
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


//declare a schema
var TaskSchema = new Schema({
  created: {
    type: Date,
    default: Date.now //default values
  },
 
  content: {
    type: String,
    default: '',
    trim: true,
    required: true  
  },

  dueDate: {
    type:Date
  },
  
//DBRef
  creator: {
    type: Schema.ObjectId,
    ref: 'User'
  },



  isDone: {
    type:Boolean,
    default:false
  },

  doneDate: {
    type:Date
  },


  project:{
    type: String,
    default:'Inbox'
  },

  tags:[
      {
        name:String

      
      }],

  priority:{
    type: Number,
    default: 4


  }

});




TaskSchema.virtual('rawContent').get(function() {

  var tags_ = [];

  for (var i=0; i < this.tags.length; i++){
    tags_.push(this.tags[i].name);
  }

  return this.content + ' ' + tags_.join(" ");


        }).set(function(rawContent) {

        //clear existing tags
        this.tags = [];
  var splitContent = rawContent.split(' ');
  
  var content_ = [];
  for (var i=0; i<splitContent.length; i++){
      //first character is @
      if (splitContent[i][0] === '@'){
        this.tags.push({"name":splitContent[i]});
   
      } else {
        content_.push(splitContent[i]);
        // console.log('content: ' + content_);
      }
    }


  this.content = content_.join(" ");
});


 
  
  

TaskSchema.set('toJSON', {
  getters: true,
  virtuals: true
});


//create a model
var Task = mongoose.model('Task', TaskSchema);

