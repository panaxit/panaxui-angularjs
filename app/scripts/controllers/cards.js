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

    // Cards data model
    $scope.model = [];

    // Preserve mode
    $scope.mode = $stateParams.mode;

    // Load grid's data model
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
        $scope.model = res.data.model || [];
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
        model: $scope.model
      });
    });

    // View/Edit handler
    $scope.onOpen =  function(selected) {
      var identifier = selected[$scope.catalog.primaryKey] ||
               selected[$scope.catalog.identityKey];

      $scope.$emit('goToState', 'main.panel.form.view', {
        catalogName: $scope.catalog.catalogName,
        mode: $scope.mode,
        id: identifier
      });
    };
  });
