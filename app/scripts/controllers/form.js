'use strict';

/**
 * @ngdoc function
 * @name panaxuiApp.controller:FormCtrl
 * @description
 * # FormCtrl
 * Controller of the panaxuiApp
 */
angular.module('panaxuiApp')
  .config(function config(formlyConfigProvider) {
    /*
	    async_select
	    Extends select template
     */
    formlyConfigProvider.setType({
      name: 'async_select',
      extends: 'select',
      defaultOptions: {
        templateOptions: {
          options: [],
          valueProp: "value",
          labelProp: "label",
        },
        controller: /* @ngInject */ function($scope, CRUDService) {
          $scope.to.loading = CRUDService.options($scope.to.params).then(function(res) {
            $scope.to.options = res;
            // note, the line above is shorthand for:
            // $scope.options.templateOptions.options = data;
            return res;
          });
        }
      }
    });
  })

	.controller('FormCtrl', function($scope, $stateParams, CRUDService, AlertService, DebugService) {

		// Model
		$scope.model = {};

		// Fields 
		$scope.fields = [];

		// Load model and fields into form
		$scope.loadForm = function() {
			// Set API params
			var params = {
				mode: $stateParams.mode,
				catalogName: $stateParams.catalogName,
				controlType: 'formView',
				getData: '1',
				getStructure: '1'
			};
			if($stateParams.id)
				params.filters = '\'id=' + $stateParams.id + '\''; // ToDo: Arbitriary Identity Key Name

			CRUDService.read(params).then(function (res) {
				// Catalog
				$scope.catalog = res.data.catalog;
				// Panel Title
				$scope.$emit('setPanelTitle', (function () {
					if($scope.catalog.mode === 'insert') return 'New ';
					if($scope.catalog.mode === 'edit') return 'Edit ';
					if($scope.catalog.mode === 'readonly') return 'View ';
				})() + $scope.catalog.tableName);
				// model
				$scope.model = res.data.model[0] || {};
				// fields
				$scope.fields = res.data.fields || [];
			});
		};
		$scope.loadForm();

		// Reload listener
		$scope.$on('reloadData', function (event, next) {
			$scope.loadForm();
		});

		// open Debug Modal and resolve `form-specific` objects
		$scope.$on('openDebugModal', function (event, next) {
			DebugService.show({
				currentUser: $scope.currentUser,
				stateParams: $stateParams,
				catalog: $scope.catalog,
				fields: $scope.fields,
				model: $scope.model
			});
		});
	});