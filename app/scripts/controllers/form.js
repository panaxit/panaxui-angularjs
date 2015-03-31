'use strict';

/**
 * @ngdoc function
 * @name panaxuiApp.controller:FormCtrl
 * @description
 * # FormCtrl
 * Controller of the panaxuiApp
 */
angular.module('panaxuiApp')
	.controller('FormCtrl', function($scope, $modal, CRUDService) {

		// get currently selected navigation branch
		$scope.currentNavBranch = $scope.navMenuControl.get_selected_branch();

		// Schema
		$scope.schema = {};

		// Form
		$scope.form = [];

		// Model
		$scope.model = {};

		// Set API params
		var params = {};
		params.getData = '1';
		params.getStructure = '1';
		params.mode = $scope.currentNavBranch.data.mode;
		params.catalogName = $scope.currentNavBranch.data.catalogName;
		params.controlType = $scope.currentNavBranch.data.controlType;
		if($scope.currentNavBranch.data.id)
			params.filters = '\'id=' + $scope.currentNavBranch.data.id + '\''; // ToDo: Arbitriary Identity Key Name

		// Load schema, form and model into form
		$scope.loadSchemaForm = function() {
			CRUDService.read(params).then(function (res) {
				$scope.schema = res.data.schema;
				$scope.form = res.data.form || ['*'];
				// $scope.form.push({
				// 	type: "actions",
				// 	style: "pull-right",
				// 	items: [
				//     { 
				//     	type: 'submit', 
				//     	title: 'Save',
				//     	style: 'btn-primary', 
				//     	icon: 'glyphicon glyphicon-ok-sign'
				//     }, { 
				//     	type: 'button', 
				//     	title: 'Cancel', 
				//     	onClick: "onCancel()",
				//     	style: 'btn-default', 
				//     	icon: 'glyphicon glyphicon-ban-circle'
				//     }
				// 	]
				// });
				$scope.model = res.data.model[0] || {};
			});
		};
		$scope.loadSchemaForm();

		// Submit handler
		$scope.onSubmit = function(form) {
			// First we broadcast an event so all fields validate themselves
			$scope.$broadcast('schemaFormValidate');

			// Then we check if the form is valid
			if (form.$valid) {
				// ... do whatever you need to do with your data.
				console.log('FORM VALID')
			} else {
				console.log('INVALID FORM NOT GOOD')
			}
		}

		// Cancel handler
		$scope.onCancel = function() {
			// ToDo: Alert of unsaved dirty form otherwise/then Go Back
		}

		// Reload listener
		$scope.$on('reloadData', function (event, next) {
			$scope.loadSchemaForm();
		});

		// open Debug Modal and resolve `form-specific` objects
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
					schema: function() {
						return $scope.schema;
					},
					form: function() {
						return $scope.form;
					},
					model: function() {
						return $scope.model;
					}
				}
			});
			debugModalInstance.result.then(function() {
				//$log.info('Debug Modal dismissed at: ' + new Date());
			});
		});
	});