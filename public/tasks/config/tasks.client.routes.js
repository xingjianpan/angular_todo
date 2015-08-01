angular.module('tasks').config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
    when('/tasks', {
      templateUrl: 'tasks/views/list-tasks.client.view.html'
    }).
  
    when('/tasks/create', {
      templateUrl: 'tasks/views/create-task.client.view.html'
    }).
    when('/tasks/:taskId', {
      templateUrl: 'tasks/views/view-task.client.view.html'
    }).
    when('/tasks/:taskId/edit', {
      templateUrl: 'tasks/views/edit-task.client.view.html'
    })
     .otherwise({ redirectTo: '/' });
  }
]);