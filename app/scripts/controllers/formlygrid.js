'use strict';

/**
 * @ngdoc function
 * @name panaxuiApp.controller:FormlyGridCtrl
 * @description
 * # FormlyGridCtrl
 * Controller of the panaxuiApp
 */
angular.module('panaxuiApp')
  .controller('FormlyGridCtrl', function ($scope) {
    var vm = this;

    vm.grid = [];
    vm.catalog = {};
    vm.data = [];

    vm.loader = function() {
      vm.data = $scope.model[$scope.options.key] || [];
      vm.grid = $scope.to.grid;
      vm.catalog = $scope.to.catalog;
    };

    vm.loader();
  });
