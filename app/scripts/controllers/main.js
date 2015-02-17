'use strict';

/**
 * @ngdoc function
 * @name panaxuiApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the panaxuiApp
 */
angular.module('panaxuiApp')
	.controller('MainCtrl', ['$scope', '$state', '$log', '$modal', 'urlifyFilter', 'NavMenu',
		function MainCtrl($scope, $state, $log, $modal, urlify, NavMenu) {

			$scope.showMenu = true;

			$scope.navMenu = NavMenu;
			$scope.navMenuControl = {};

			$scope.currentNavBranch = NavMenu.data;

			$scope.goToRoute = function goToRoute(branch) {
				$scope.navMenuControl.select_branch(branch);
				$scope.currentNavBranch = branch;

				if (branch.level === 1) {
					$state.go('home');
				} else if (branch.children && branch.children.length > 0) {
					$state.go('home.category', {
						name: urlify(branch.label)
					});
				} else {
					$state.go('home.' + branch.data.controlType, branch.data);
				}
			};

			$scope.openDebugModal = function () {
				var debugModalInstance = $modal.open({
					templateUrl: 'views/shell/debug.html',
					controller: 'DebugCtrl',
					resolve: {
						currentNavBranch: function() {
							return $scope.currentNavBranch;
						}
					}
				});

				debugModalInstance.result.then(function(/*selectedItem*/) {
					//$scope.selected = selectedItem;
				}, function() {
					$log.info('Debug Modal dismissed at: ' + new Date());
				});

			};

		}
	]);