export default class CategoryCtrl {
  constructor($rootScope, $scope, DebugService) {
    var vm = this
    var chunk, i, j, row

    vm.categoryTitle = $rootScope.currentNavBranch.label
    $scope.$emit('setPanelTitle', 'Category: ' + vm.categoryTitle)

    vm.categoryChildren = []
    chunk = 5
    for (i = 0; i < $rootScope.currentNavBranch.children.length; i += chunk) {
      row = $rootScope.currentNavBranch.children.slice(i, i + chunk)
      vm.categoryChildren.push(row)
      for (j = 0; j < row.length; j++) {
        row[j].image = require('./img/' + (row[j].data.controlType || 'category') + '.png')
      }
    }

    vm.onClick = function(node) {
      $scope.$emit('goToBranch', node)
    }

    // open Debug Modal and resolve `category-specific` objects
    $scope.$on('openDebugModal', function() {
      DebugService.show()
    })

  }
}
