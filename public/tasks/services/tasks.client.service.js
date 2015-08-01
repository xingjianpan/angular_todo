

// Some APIs expect a PUT request in the format URL/object/ID
// Here we are creating an 'update' method
// https://docs.angularjs.org/api/ngResource/service/$resource

angular.module('tasks').factory('Tasks', ['$resource', function($resource) {
  return $resource('api/tasks/:taskId', {
    taskId: '@_id'
  }, {
    update: {
      method: 'PUT'
    }
  });
}]);