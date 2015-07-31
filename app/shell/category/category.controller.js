export default class CategoryCtrl {
  constructor($rootScope, $scope, DebugService) {
    var vm = this;

    vm.currentNavBranch = $rootScope.currentNavBranch;

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
