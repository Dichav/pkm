
var BlogApp = angular.module('BlogApp', ['ionic', 'ngRoute', 'ngSanitize'])

.run(function($ionicPlatform, $rootScope, $location) {

//like CodeIgniter. Defines home path
  $rootScope.goHome = function() {
    $location.path('/list');
  };

  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {

      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});

BlogApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider

  .when('/list', {
    controller: 'ListController',
    templateUrl: 'partials/list.html'
  })

  .when('/details/:itemId', {
    controller: 'DetailsController',
    templateUrl: 'partials/details.html'
  })

  .otherwise({redirectTo: '/list'});

}]);

BlogApp.controller('ListController', ['$scope', '$http', '$ionicLoading', function($scope, $http, $ionicLoading) {
  $scope.loadpkms = function() {
    $ionicLoading.show();
    $http.get('http://pokeapi.co/api/v1/pokemon/2') 
        //$http.get('http://pokeapi.co/api/v1/pokemon/') 
    .success(function(response) {

      $scope.pokename = response;
      //console.log(response.attack);
      $ionicLoading.hide();
    })
    .finally(function() {
      $scope.broadcast('scroll.refreshComplete');
    });
  };
  $scope.loadpkms();

}]);



BlogApp.controller('DetailsController', ['$scope', '$http', '$ionicLoading', '$routeParams', function($scope, $http, $ionicLoading, $routeParams) {
  $scope.loadpkm = function() {
    $ionicLoading.show();
    $http.get('http://pokeapi.co/api/v1/pokemon/2') 
    .success(function(response.abilities) {

      $scope.pokename = response.abilities;
      //console.log(response.attack);
      $ionicLoading.hide();
    })
    .finally(function() {
      $scope.broadcast('scroll.refreshComplete');
    });
  };
  $scope.loadpkm();

}]);
