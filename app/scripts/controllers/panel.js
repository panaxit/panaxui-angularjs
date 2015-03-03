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

  	// get currently selected navigation branch
  	$scope.currentNavBranch = $scope.navMenuControl.get_selected_branch();

  	/*
  	Broadcast events to children scopes: form, grid, cards, ...
  	 */
  	$scope.reloadClick = function() {
  		$scope.$broadcast('reloadSchemaForm'); // ToDo: Rename to general term: reloadPanelContentView ...?
  	};
  	$scope.debugClick = function() {
  		$scope.$broadcast('openDebugModal');
  	};

  });
