'use strict';

/**
 * @ngdoc function
 * @name panaxuiApp.controller:FormlyGridCtrl
 * @description
 * # FormlyGridCtrl
 * Controller of the panaxuiApp
 */
angular.module('panaxuiApp')
  .controller('FormlyGridCtrl', function ($scope, $controller) {
    var vm = this;

    // Mixin: http://moduscreate.com/angularjs-tricks-with-angular-extend/
    var BaseCtrl = $controller('GridCtrl as vm', {$scope: $scope});
    angular.extend(this, BaseCtrl);

    /*
    Overload methods
     */
    vm.loader = function() {
      vm.data = $scope.model[$scope.options.key] || [];
      vm.grid = $scope.options.data.grid;
      vm.catalog = $scope.options.data.catalog;
    };

    vm.loader();

    vm.watchers = function() {
    };

    vm.watchers();
  });
