export default class MainCtrl {
  constructor($rootScope, $scope, $state, urlifyFilter, AuthService, AUTH_EVENTS, SessionService) {
  	var vm = this;

    vm.currentUser = SessionService;

		/**********************
		 * Nav-Tree & Sitemap *
		 **********************/
		vm.treeData = [{
			label: 'Home'
			//children: []
		}];
    vm.treeOptions = {
      nodeChildren: "children",
      dirSelectable: true,
      injectClasses: {
          iCollapsed: "glyphicon glyphicon-plus",
          iExpanded: "glyphicon glyphicon-minus",
          iLeaf: "glyphicon glyphicon-file"
      }
    };
    vm.treeSelected = vm.treeData[0];
    vm.selectHome = function() {
      vm.onSelection(vm.treeData[0]);
    };
		// Populate nav-tree with sitemap data
		AuthService.sitemap().then(function(res) {
			vm.treeData[0].children = res.data;
      vm.treeExpanded = [vm.treeData[0]];
		});
    vm.onSelection = function(node) {
      $scope.$emit('goToBranch', node);
    };

		// Go to arbitriary state
		vm.goToState = function(state, catalog) {
			$state.go(state, catalog);
		};
		// Go to arbitriary state and unselect nav-tree
		$scope.$on('goToState', function (event, state, catalog) {
			vm.goToState(state, catalog);
			//vm.navMenuControl.select_branch(null);
		});
		// Go to state of selected branch (nav-tree)
		$scope.$on('goToBranch', function (event, branch) {
      $rootScope.currentNavBranch = branch;
      // Reset inherited query parameters
      // https://github.com/angular-ui/ui-router/wiki/Quick-Reference#toparams
      branch.data.id = branch.data.id || undefined;
      branch.data.filters = branch.data.filters || undefined;
      //goToState
			if (branch === vm.treeData[0])
				vm.goToState('main.home');
      else if (branch.children && branch.children.length)
				vm.goToState('main.panel.category', {
					name: urlifyFilter(branch.label)
				});
      else if (branch.data.controlType === 'gridView')
				vm.goToState('main.panel.grid', branch.data);
      else if (branch.data.controlType === 'formView')
        vm.goToState('main.panel.form', branch.data);
      else if (branch.data.controlType === 'cardView')
        vm.goToState('main.panel.cards', branch.data);
		});

    vm.logout = function() {
      AuthService.logout();
      $scope.$emit(AUTH_EVENTS.logoutSuccess);
    };

  	// Open debug modal
  	vm.debugClick = function() {
  		$scope.$broadcast('openDebugModal');
  	};
  }
}

MainCtrl.$inject = ['$rootScope', '$scope', '$state', 'urlifyFilter', 'AuthService', 'AUTH_EVENTS', 'SessionService'];
