'use strict';

/**
 * @ngdoc function
 * @name panaxuiApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the panaxuiApp
 */
angular.module('panaxuiApp')
	.controller('MainCtrl', function MainCtrl($scope) {
		$scope.menu = [{
			label: 'SINCO',
			children: [{
				label: 'Catalogs'
			}]
		}, {
			label: 'Kitchensink',
			children: [{
				label: 'Grids',
				children: [{
					label: 'Simple Grid'
				}]
			}, {
				label: 'Forms',
				children: [{
					label: 'Form: Basic Controls'
				}, {
					label: 'Form: Advanced Controls'
				}, {
					label: 'Form: Nested Grid (1-N)'
				}, {
					label: 'Form: Nested Form (1-1)'
				}, {
					label: 'Form: Cascaded Comboboxes'
				}]
			}]
		}];

		$scope.navigationData = [{
			label: 'Home',
			children: $scope.menu
		}];

		$scope.gridOptions = {
			paginationPageSizes: [5, 10, 25],
			paginationPageSize: 5
		};

		$scope.gridOptions.onRegisterApi = function(gridApi) {
			$scope.gridApi = gridApi;
		};

		$scope.getPage = function(num) {
			return new Array(num);
		};

		$scope.gridOptions.data = [{
			'firstName': 'Cox',
			'lastName': 'Carney',
			'company': 'Enormo',
			'employed': true
		}, {
			'firstName': 'Lorraine',
			'lastName': 'Wise',
			'company': 'Comveyer',
			'employed': false
		}, {
			'firstName': 'Nancy',
			'lastName': 'Waters',
			'company': 'Fuelton',
			'employed': false
		}, {
			'firstName': 'Cox',
			'lastName': 'Carney',
			'company': 'Enormo',
			'employed': true
		}, {
			'firstName': 'Lorraine',
			'lastName': 'Wise',
			'company': 'Comveyer',
			'employed': false
		}, {
			'firstName': 'Nancy',
			'lastName': 'Waters',
			'company': 'Fuelton',
			'employed': false
		}, {
			'firstName': 'Cox',
			'lastName': 'Carney',
			'company': 'Enormo',
			'employed': true
		}, {
			'firstName': 'Lorraine',
			'lastName': 'Wise',
			'company': 'Comveyer',
			'employed': false
		}, {
			'firstName': 'Nancy',
			'lastName': 'Waters',
			'company': 'Fuelton',
			'employed': false
		}, {
			'firstName': 'Cox',
			'lastName': 'Carney',
			'company': 'Enormo',
			'employed': true
		}, {
			'firstName': 'Lorraine',
			'lastName': 'Wise',
			'company': 'Comveyer',
			'employed': false
		}, {
			'firstName': 'Nancy',
			'lastName': 'Waters',
			'company': 'Fuelton',
			'employed': false
		}, {
			'firstName': 'Cox',
			'lastName': 'Carney',
			'company': 'Enormo',
			'employed': true
		}, {
			'firstName': 'Lorraine',
			'lastName': 'Wise',
			'company': 'Comveyer',
			'employed': false
		}, {
			'firstName': 'Nancy',
			'lastName': 'Waters',
			'company': 'Fuelton',
			'employed': false
		}, {
			'firstName': 'Cox',
			'lastName': 'Carney',
			'company': 'Enormo',
			'employed': true
		}, {
			'firstName': 'Lorraine',
			'lastName': 'Wise',
			'company': 'Comveyer',
			'employed': false
		}, {
			'firstName': 'Nancy',
			'lastName': 'Waters',
			'company': 'Fuelton',
			'employed': false
		}];

	});