export default class PanelCtrl {
  constructor($scope) {
    var vm = this

    // Change title
    $scope.$on('setPanelTitle', function(event, title) {
      vm.panelTitle = title
    })

    // Reload data
    vm.reloadClick = function() {
      $scope.$broadcast('reloadData')
    }
  }
}
