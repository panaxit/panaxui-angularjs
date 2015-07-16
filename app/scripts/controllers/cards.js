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

    vm.loader = function() {
      CRUDService.read({
        mode: 'readonly', //$stateParams.mode, // Is always readonly to get all records
        catalogName: $stateParams.catalogName,
        controlType: 'cardView',
        getData: "1",
        getStructure: "1"
      }).then(function (res) {
        vm.catalog = res.data.catalog || {};
        vm.data = res.data.model || [];
      });
    };

    vm.loader();

    $scope.$on('reloadData', function (event, next) {
      vm.loader();
    });

    vm.onOpen =  function(selected) {
      var identifier = selected[vm.catalog.primaryKey] ||
               selected[vm.catalog.identityKey];

      $scope.$emit('goToState', 'main.panel.form', {
        catalogName: vm.catalog.catalogName,
        mode: vm.mode,
        id: identifier
      });
    };

    $scope.$on('openDebugModal', function (event, next) {
      DebugService.show({
        catalog: vm.catalog,
        model: vm.data
      });
    });

  });
