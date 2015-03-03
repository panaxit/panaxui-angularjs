'use strict';

/**
 * @ngdoc function
 * @name panaxuiApp.controller:GridCtrl
 * @description
 * # GridCtrl
 * Controller of the panaxuiApp
 */
angular.module('panaxuiApp')
	.controller('GridCtrl', function($scope) {

		// get currently selected navigation branch
		$scope.currentNavBranch = $scope.navMenuControl.get_selected_branch();

		// Grid options
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