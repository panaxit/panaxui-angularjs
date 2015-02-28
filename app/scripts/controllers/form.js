'use strict';

/**
 * @ngdoc function
 * @name panaxuiApp.controller:FormCtrl
 * @description
 * # FormCtrl
 * Controller of the panaxuiApp
 */
angular.module('panaxuiApp')
	.controller('FormCtrl', function($scope, CRUDService) {

		$scope.schema = {};

		$scope.form = [
			"*"
		];

		$scope.model = {};

		var currentBranch = $scope.navMenuControl.get_selected_branch();

		CRUDService.read(currentBranch.data).then(function (res) {
			console.log(currentBranch.data)
			$scope.schema = res.data.schema;
		});
	});