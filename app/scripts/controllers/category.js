'use strict';

/**
 * @ngdoc function
 * @name panaxuiApp.controller:CategoryCtrl
 * @description
 * # CategoryCtrl
 * Controller of the panaxuiApp
 */
angular.module('panaxuiApp')
	.controller('CategoryCtrl', function($scope, $modal) {

		$scope.currentBranch = $scope.navMenuControl.get_selected_branch();

		$scope.columnSize = ($scope.currentBranch.children.length <= 12) ? Math.floor(12 / $scope.currentBranch.children.length) : 1

  	$scope.debugClick = function() {
			var debugModalInstance = $modal.open({
				templateUrl: 'views/shell/debug.html',
				controller: 'DebugCtrl',
				resolve: {
					currentUser: function() {
						return $scope.currentUser;
					},
					currentNavBranch: function() {
						return $scope.navMenuControl.get_selected_branch();
					},
					schema: null,
					form: null,
					model: null
				}
			});

			debugModalInstance.result.then(function() {
				$log.info('Debug Modal dismissed at: ' + new Date());
			});
  	};

	});