export default class PanelCtrl {
  constructor($scope) {
    // Change title
    $scope.$on('setPanelTitle', function (event, title) {
      $scope.panelTitle = title;
    });

    // Reload data
    $scope.reloadClick = function() {
      $scope.$broadcast('reloadData');
    };
  }
}

PanelCtrl.$inject = ['$scope'];
