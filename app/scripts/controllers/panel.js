'use strict';

/**
 * @ngdoc function
 * @name panaxuiApp.controller:PanelCtrl
 * @description
 * # PanelCtrl
 * Controller of the panaxuiApp
 */
angular.module('panaxuiApp')
  .controller('PanelCtrl', function ($scope) {

  	$scope.currentBranch = $scope.navMenuControl.get_selected_branch();

  });
