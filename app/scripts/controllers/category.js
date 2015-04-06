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

  	// get currently selected navigation branch
		$scope.currentNavBranch = $scope.navMenuControl.get_selected_branch();

		// calculate column size for thumbnail;s
		$scope.columnSize = ($scope.currentNavBranch.children.length <= 12) ? Math.floor(12 / $scope.currentNavBranch.children.length) : 1

		// open Debug Modal and resolve `category-specific` objects
		$scope.$on('openDebugModal', function (event, next) {
			var debugModalInstance = $modal.open({
				templateUrl: 'views/shell/debug.html',
				controller: 'DebugCtrl',
				size: 'lg',
				resolve: {
					currentUser: function() {
						return $scope.currentUser;
					},
					currentNavBranch: function() {
						return $scope.currentNavBranch;
					},
					catalog: null,
					schema: null,
					form: null,
					model: null
				}
			});
			debugModalInstance.result.then(function() {
				//$log.info('Debug Modal dismissed at: ' + new Date());
			});
  	});

	});