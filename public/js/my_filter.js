
angular.module('taskFilters',[] ).filter('checkmark', function(){
			return function(input){
				return input ? '\u2713' : '\u2718';
			};
		});
 




 angular.module('taskFilters').filter('hideAtSymbolInTag', function(){
			return function(tag){
				return tag.slice(1);
			};
		});
 
 function onlyUnique(value, index, self) { 
    return self.indexOf(value) === index;
}


 angular.module('taskFilters').filter('generateTagsFromTasks', function(){
			return function(tasks){
				  tags_=[]
				 for(var i=0; i<tasks.length;i++){
				 	
				 	if(tasks[i].tags){



				 		for( var j=0; j<tasks[i].tags.length;j++)
				 			tags_.push(tasks[i].tags[j].name);

				 	}		
				 }

				 uniqueTags = tags_.filter(onlyUnique);
				 return uniqueTags;
			};
		});

// var showdown=require('showdown');
var converter = new showdown.Converter();

//  for more information, see http://stackoverflow.com/questions/9381926/insert-html-into-view-using-angularjs

angular.module('taskFilters').filter('convertToMarkdown', ['$sce', function($sce){
			return function(htmlCode){
				return  $sce.trustAsHtml(converter.makeHtml(htmlCode));
			};
		}]);