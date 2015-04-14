'use strict';

/**
 * @ngdoc function
 * @name panaxuiApp.controller:CategoryCtrl
 * @description
 * # CategoryCtrl
 * Controller of the panaxuiApp
 */
angular.module('panaxuiApp')
	.controller('CategoryCtrl', function($scope, $stateParams, $modal) {

  	// get currently selected navigation branch
		$scope.currentNavBranch = $scope.navMenuControl.get_selected_branch();

		// open Debug Modal and resolve `category-specific` objects
		$scope.$on('openDebugModal', function (event, next) {
			var debugModalInstance = $modal.open({
				templateUrl: 'views/shell/debug.html',
				controller: 'DebugCtrl',
				size: 'lg',
				resolve: {
					debugInfo: function() {
						return {
							currentUser: $scope.currentUser,
							stateParams: $stateParams
						};
					}
				}
			});
			debugModalInstance.result.then(function() {
				//$log.info('Debug Modal dismissed at: ' + new Date());
			});
  	});

	});