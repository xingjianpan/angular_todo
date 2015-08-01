 

angular.module('tasks').controller('TasksController',
	['$scope', '$http','$routeParams', '$location','Authentication','Tasks',
	


	function($scope,$http,$routeParams, $location,Authentication,Tasks){

		 $scope.authentication = Authentication;
 


	    
	$scope.create = function() {


		console.log($routeParams);


		  var task = new Tasks({
		    content: this.content,
		    dueDate: this.dueDate
		  });


		  for (var attrname in $routeParams) {
		  	task[attrname] = $routeParams[attrname];
		  }




		  task.$save(function(response) {
		    $location.path('tasks/');
		  }, function(errorResponse) {
		    $scope.error = errorResponse.data.message;
		  });
	};


	$scope.find = function() {

	  // console.log($routeParams);

 

	  // $scope.tasks = Tasks.query();

 		//这样就可以吧query string 传过去了
	 
	  	$scope.tasks = Tasks.query($routeParams);
 

	  	//db.$cmd.findOne({"distinct":"tasks","key":"tags.name"})

		
	  	 
	   // $http(
	   // 	   {url:'/api/tasks/tags',
	   // 	  method:'GET',
	   // 	  params:{"creator":user._id}
	   // 	  }).success(function(data, status){
	   // 					$scope.tags=data;
	   // 					$scope.status=status;
	   // 				})
	   // 				.error(function(data, status){
	   // 					$scope.data = data || "Request failed";
	   // 					$scope.status = status;
	   // 				});

	   // console.log('-----');
	   // console.log($scope.tags);
 	
		 


	};


	 




	$scope.findOne = function() {
	  $scope.task = Tasks.get({
	    taskId: $routeParams.taskId
	  });
	};



	$scope.update = function() {
	  $scope.task.$update(function() {
	    $location.path('tasks/' );
	  }, function(errorResponse) {
	    $scope.error = errorResponse.data.message;
	  });
	};


	$scope.delete = function(task) {
	  if (task) {
	    task.$remove(function() {
	      for (var i in $scope.tasks) {
	        if ($scope.tasks[i] === task) {
	          $scope.tasks.splice(i, 1);
	        }
	      }
	    });
	  } else {
	    $scope.task.$remove(function() {
	      $location.path('tasks/');
	    });
	  }
	};



	$scope.onComplteTodo = function(task){



		task.isDone = !task.isDone;	//toggle true/false
		task.$update(
			// function() {$location.path('tasks/' );},

			//if success
            function(){console.log('ok');},
            //if failed
			function(errorResponse) {$scope.error = errorResponse.data.message;}
			);
 	};


 
  	// $scope.updateTask = function(data){

  	// 	console.log('got it');
  	// 	task.content = data.content;
  	// 		task.$update(
			// // function() {$location.path('tasks/' );},

			// //if success
   //          function(){console.log('ok');},
   //          //if failed
			// function(errorResponse) {$scope.error = errorResponse.data.message;}
			// );
  	// }
 
	



	 }

   ]

);

