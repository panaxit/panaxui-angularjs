(function() {
	var app = angular.module('pxShell', [
		'ui.bootstrap', 'ngTouch', /*'ngAnimate',*/
		'angularBootstrapNavTree',
		'ui.grid', 'ui.grid.autoResize', 'ui.grid.pagination'
	]);

	app.directive('pxShellHeader', function() {
		return {
			templateUrl: 'views/shell/header.html'
		};
	});

	app.directive('pxShellBreadcrumb', function() {
		return {
			templateUrl: 'views/shell/breadcrumb.html'
		};
	});

	app.directive('pxShellContentPanel', function() {
		return {
			templateUrl: 'views/shell/content-panel.html'
		};
	});

	app.directive('pxShellNavTree', function() {
		return {
			templateUrl: 'views/shell/nav-tree.html'
		};
	});

	app.controller('pxShellNavTreeController', ['$scope', function($scope) {
		$scope.navigation_data = [{
			label: 'SINCO',
			children: [{
				label: 'Catalogs'
			}]
		}, {
			label: 'Kitchensink',
			children: [{
				label: 'Grids',
				children: [{
					label: 'Simple Grid'
				}]
			}, {
				label: 'Forms',
				children: [{
					label: 'Form: Basic Controls'
				}, {
					label: 'Form: Advanced Controls'
				}, {
					label: 'Form: Nested Grid (1-N)'
				}, {
					label: 'Form: Nested Form (1-1)'
				}, {
					label: 'Form: Cascaded Comboboxes'
				}]
			}]
		}];
	}]);

	app.controller('pxGridController', ['$scope', function ($scope) {
		$scope.gridOptions = {
			paginationPageSizes: [5, 10, 25],
			paginationPageSize: 5
		};

		$scope.gridOptions.onRegisterApi = function (gridApi) {
			$scope.gridApi = gridApi;
		};

		$scope.getPage = function (num) {
		    return new Array(num);   
		}

		$scope.gridOptions.data = [{
			"firstName": "Cox",
			"lastName": "Carney",
			"company": "Enormo",
			"employed": true
		}, {
			"firstName": "Lorraine",
			"lastName": "Wise",
			"company": "Comveyer",
			"employed": false
		}, {
			"firstName": "Lorraine",
			"lastName": "Wise",
			"company": "Comveyer",
			"employed": false
		}, {
			"firstName": "Lorraine",
			"lastName": "Wise",
			"company": "Comveyer",
			"employed": false
		}, {
			"firstName": "Lorraine",
			"lastName": "Wise",
			"company": "Comveyer",
			"employed": false
		}, {
			"firstName": "Lorraine",
			"lastName": "Wise",
			"company": "Comveyer",
			"employed": false
		}, {
			"firstName": "Lorraine",
			"lastName": "Wise",
			"company": "Comveyer",
			"employed": false
		}, {
			"firstName": "Lorraine",
			"lastName": "Wise",
			"company": "Comveyer",
			"employed": false
		}, {
			"firstName": "Lorraine",
			"lastName": "Wise",
			"company": "Comveyer",
			"employed": false
		}, {
			"firstName": "Lorraine",
			"lastName": "Wise",
			"company": "Comveyer",
			"employed": false
		}, {
			"firstName": "Lorraine",
			"lastName": "Wise",
			"company": "Comveyer",
			"employed": false
		}, {
			"firstName": "Lorraine",
			"lastName": "Wise",
			"company": "Comveyer",
			"employed": false
		}, {
			"firstName": "Lorraine",
			"lastName": "Wise",
			"company": "Comveyer",
			"employed": false
		}, {
			"firstName": "Lorraine",
			"lastName": "Wise",
			"company": "Comveyer",
			"employed": false
		}, {
			"firstName": "Nancy",
			"lastName": "Waters",
			"company": "Fuelton",
			"employed": false
		}];
	}]);
})();