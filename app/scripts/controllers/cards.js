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

    // Cards data
    $scope.data = [];

    // Preserve mode
    $scope.mode = $stateParams.mode;

    // Load grid's data
    $scope.loadData = function() {
      CRUDService.read({
        mode: 'readonly', //$stateParams.mode, // Is always readonly to get all records
        catalogName: $stateParams.catalogName,
        controlType: 'cardView',
        getData: "1",
        getStructure: "1"
      }).then(function (res) {
        // Catalog
        $scope.catalog = res.data.catalog;
        // Grid's Model
        $scope.data = res.data.model || [];
      });
    };
    $scope.loadData();

    // Reload listener
    $scope.$on('reloadData', function (event, next) {
      // ToDo: Redraw (re-render) grid. Ex.: when hiding, showing columns
      $scope.loadData();
    });

    // open Debug Modal and resolve `form-specific` objects
    $scope.$on('openDebugModal', function (event, next) {
      DebugService.show({
        currentUser: $scope.currentUser,
        stateParams: $stateParams,
        catalog: $scope.catalog,
        //grid: $scope.gridOptions.columnDefs,
        model: $scope.data
      });
    });
  });
