'use strict';

/**
 * @ngdoc function
 * @name panaxuiApp.controller:CardsCtrl
 * @description
 * # CardsCtrl
 * Controller of the panaxuiApp
 */
angular.module('panaxuiApp')
  .controller('CardsCtrl', function($scope, $stateParams, CRUDService, DebugService) {
    var vm = this;

    vm.mode = $stateParams.mode;
    vm.catalog = {};
    vm.model = [];

    vm.loader = function() {
      CRUDService.read({
        mode: 'readonly', //$stateParams.mode, // Is always readonly to get all records
        catalogName: $stateParams.catalogName,
        controlType: 'cardView',
        getData: "1",
        getStructure: "1"
      }).then(function (res) {
        vm.catalog = res.data.catalog || {};
        vm.model = res.data.model || [];
      });
    };
    vm.loader();

    $scope.$on('reloadData', function (event, next) {
      vm.loader();
    });

    $scope.$on('openDebugModal', function (event, next) {
      DebugService.show({
        catalog: vm.catalog,
        model: vm.model
      });
    });
  });
