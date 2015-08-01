// TODO 
// 1. Model validation
// 2. statis methods and instance method
// 3. middle ware


var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


//declare a schema
var ArticleSchema = new Schema({
  created: {
    type: Date,
    default: Date.now //default values
  },
  title: {
    type: String,
    default: '',
    required: true,
    trim: true, //Predefined modifiers
     
  },
  content: {
    type: String,
    default: '',
    trim: true,
    get :function(content){
      url = 'This is content: ' + content;
      return url;
    },
  },
  
//DBRef
  creator: {
    type: Schema.ObjectId,
    ref: 'User'
  }

});


//create a model
mongoose.model('Article', ArticleSchema);


//customized getters
ArticleSchema.set('toJSON', { getters: true });

//customize static methods

ArticleSchema.statics.findOneByArticleTitle = function (title, callback) {
  this.findOne({ title: new RegExp(title, 'i') }, callback);
};