export default class MainCtrl {
  constructor($rootScope, $scope, $state, urlifyFilter, AuthService, AUTH_EVENTS, SessionService) {
    var vm = this

    vm.currentUser = SessionService

    /**********************
     * Nav-Tree & Sitemap *
     **********************/
    vm.treeOptions = {
      nodeChildren: 'children',
      dirSelectable: true,
      injectClasses: {
        iCollapsed: 'glyphicon glyphicon-plus',
        iExpanded: 'glyphicon glyphicon-minus',
        iLeaf: 'glyphicon glyphicon-file',
      },
    }
    vm.selectHome = function() {
      vm.goToState('main.home')
    }
      // Populate nav-tree with sitemap data
    AuthService.sitemap().then(function(res) {
      vm.treeData = res.data
      vm.treeExpanded = [vm.treeData]
    })
    vm.onSelection = function(node) {
      $scope.$emit('goToBranch', node)
    }

    // Go to arbitriary state
    vm.goToState = function(state, metadata) {
      $state.go(state, metadata)
    }
      // Go to arbitriary state and unselect nav-tree
    $scope.$on('goToState', function(event, state, metadata) {
      vm.goToState(state, metadata)
          //vm.navMenuControl.select_branch(null);
    })
      // Go to state of selected branch (nav-tree)
    $scope.$on('goToBranch', function(event, branch) {
      $rootScope.currentNavBranch = branch
      if (branch.children && branch.children.length) {
        return vm.goToState('main.panel.category', {
          name: urlifyFilter(branch.label),
        })
      }
      // Reset inherited query parameters
      // https://github.com/angular-ui/ui-router/wiki/Quick-Reference#toparams
      branch.data.filters = branch.data.filters || undefined
      branch.data.pageSize = branch.data.pageSize || undefined
      branch.data.pageIndex = branch.data.pageIndex || undefined
      branch.data.ref = branch.data.ref || undefined
      branch.data.refId = branch.data.refId || undefined
      if (branch.data.controlType === 'gridView') {
        return vm.goToState('main.panel.grid', branch.data)
      } else if (branch.data.controlType === 'formView') {
        return vm.goToState('main.panel.form', branch.data)
      } else if (branch.data.controlType === 'cardsView') {
        return vm.goToState('main.panel.cards', branch.data)
      } else if (branch.data.controlType === 'masterDetail') {
        return vm.goToState('main.panel.master-detail', branch.data)
      } else if (branch.data.controlType === 'fileTemplate') {
        return vm.goToState('main.panel.template', branch.data)
      }
    })

    vm.logout = function() {
      $scope.$emit(AUTH_EVENTS.logoutSuccess)
    }

    // Open debug modal
    vm.debugClick = function() {
      $scope.$broadcast('openDebugModal')
    }
  }
}
