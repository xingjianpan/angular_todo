// sampel test
describe("A suite", function() {
  it("contains spec with an expectation", function() {
    expect(true).toBe(true);
  });
});



// Testing modules
describe('Testing MEAN Main Module', function() {
  var mainModule;

  beforeEach(function() {
    mainModule = angular.module('mean');
  });

  it('Should be registered', function() {
    expect(mainModule).toBeDefined();
  });
});


//Testing controller
describe('Testing Articles Controller', function() {
  var _scope, ArticlesController;

  beforeEach(function() {
    module('mean');

    inject(function($rootScope, $controller) {
      _scope = $rootScope.$new();
      ArticlesController = $controller('ArticlesController', {
        $scope: _scope
      });
    });
  });

  it('Should be registered', function() {
    expect(ArticlesController).toBeDefined();
  });

  it('Should include CRUD methods', function() {
    expect(_scope.find).toBeDefined();
    expect(_scope.findOne).toBeDefined();
    expect(_scope.create).toBeDefined();
    expect(_scope.delete).toBeDefined();
    expect(_scope.update).toBeDefined();
  });
});



// Testing service
describe('Testing Articles Service', function() {
  var _Articles;

  beforeEach(function() {
    module('mean');

    inject(function(Articles) {
      _Articles = Articles;
    });
  });

  it('Should be registered', function() {
    expect(_Articles).toBeDefined();
  });

  it('Should include $resource methods', function() {
    expect(_Articles.get).toBeDefined();
    expect(_Articles.query).toBeDefined();
    expect(_Articles.remove).toBeDefined();
    expect(_Articles.update).toBeDefined();
  });
});



//testing routes
describe('Testing Articles Routing', function() {
  beforeEach(module('mean'));

  it('Should map a "list" route', function() {
    inject(function($route) {
      expect($route.routes['/articles'].templateUrl).toEqual('articles/views/list-articles.view.html');
    });
  });
});



//testing directives
describe('Testing The ngBind Directive', function() {
  beforeEach(module('mean'));

  it('Should bind a value to an HTML element', function() {
    inject(function($rootScope, $compile) {
      var _scope = $rootScope.$new();
      element = $compile('<div data-ng-bind="testValue"></div>')(_scope);

      _scope.testValue = 'Hello World';
      _scope.$digest();

      expect(element.html()).toEqual(_scope.testValue);
    });
  });
});


//testing filters
describe('Testing The Lowercase Filter', function() {
  beforeEach(module('mean'));

  it('Should convert a string characters to lowercase', function() {
    inject(function($filter) {
      var input = 'Hello World';
      var toLowercaseFilter = $filter('lowercase');

      expect(toLowercaseFilter(input)).toEqual(input.toLowerCase());
    });
  });
});




describe('Testing Articles Controller', function() {
  var _scope, ArticlesController;

  beforeEach(function() {
    module('mean');

    jasmine.addMatchers({
      toEqualData: function(util, customEqualityTesters) {
        return {
          compare: function(actual, expected) {
            return {
              pass: angular.equals(actual, expected)
            };
          }
        };
      }
    });
    inject(function($rootScope, $controller) {
      _scope = $rootScope.$new();
      ArticlesController = $controller('ArticlesController', {
        $scope: _scope
      });
    });
  });

  it('Should have a find method that uses $resource to retrieve a list of articles', inject(function(Articles) {
    inject(function($httpBackend) {
      var sampleArticle = new Articles({
        title: 'An Article about MEAN',
        content: 'MEAN rocks!'
      });
      var sampleArticles = [sampleArticle];

      $httpBackend.expectGET('api/articles').respond(sampleArticles);

      _scope.find();
      $httpBackend.flush();

      expect(_scope.articles).toEqualData(sampleArticles);
    });
  }));
  it('Should have a findOne method that uses $resource to retreive a single of article', inject(function(Articles) {
    inject(function($httpBackend, $routeParams) {
      var sampleArticle = new Articles({
        title: 'An Article about MEAN',
        content: 'MEAN rocks!'
      });

      $routeParams.articleId = 'abcdef123456789012345678';

      $httpBackend.expectGET(/api\/articles\/([0-9a-fA-F]{24})$/).respond(sampleArticle);

      _scope.findOne();
      $httpBackend.flush();

      expect(_scope.article).toEqualData(sampleArticle);
    });
  }));
});