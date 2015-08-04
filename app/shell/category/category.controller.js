export default class CategoryCtrl {
  constructor($rootScope, $scope, DebugService) {
    var vm = this;

    vm.currentNavBranch = $rootScope.currentNavBranch;

    $scope.$emit('setPanelTitle', 'Category: ' + vm.currentNavBranch.label);

    vm.onClick = function(node) {
      $scope.$emit('goToBranch', node);
    };

    // open Debug Modal and resolve `category-specific` objects
    $scope.$on('openDebugModal', function (event, next) {
      DebugService.show();
    });

  }
}

CategoryCtrl.$inject = ['$rootScope', '$scope', 'DebugService'];
