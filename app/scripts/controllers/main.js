'use strict';

/**
 * @ngdoc function
 * @name panaxuiApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the panaxuiApp
 */
angular.module('panaxuiApp')
	.controller('MainCtrl', ['$scope', '$state', '$log', '$modal', 'urlifyFilter', 'AuthService',
		function MainCtrl($scope, $state, $log, $modal, urlify, AuthService) {

			// Show menu toggle
			$scope.showMenu = true;

			// abn-tree control api object
			$scope.navMenuControl = {};

			// abn-tree data array
			$scope.navMenuData = [{
				label: 'Home',
				children: AuthService.sitemap().query()
			}];

			// Change route (state) function
			$scope.goToRoute = function (branch) {
				$scope.navMenuControl.select_branch(branch); // ToDo: Should be in routeChanged event

				if (branch.level === 1) {
					$state.go('home');
				} else if (branch.children && branch.children.length > 0) {
					$state.go('home.category', {
						name: urlify(branch.label)
					});
				} else {
					$state.go('home.panel.' + branch.data.controlType, branch.data);
				}
			};

			// Debug modal "window"
			$scope.openDebugModal = function () {
				var debugModalInstance = $modal.open({
					templateUrl: 'views/shell/debug.html',
					controller: 'DebugCtrl',
					resolve: {
						currentNavBranch: function() {
							return $scope.navMenuControl.get_selected_branch();
						}
					}
				});

				debugModalInstance.result.then(function() {
					$log.info('Debug Modal dismissed at: ' + new Date());
				});
			};
		}
	]);