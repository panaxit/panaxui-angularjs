import angular from 'angular'

export default class DebugCtrl {
  constructor($scope, $rootScope, $stateParams, $uibModalInstance, $location,
    SessionService, formlyVersion, debugInfo) {

    // Set debugInfo provider
    $scope.debugInfo = debugInfo || {}
    $scope.debugInfo.currentUser = SessionService
    $scope.debugInfo.stateParams = $stateParams
    $scope.debugInfo.env = {
      angularVersion: angular.version.full,
      formlyVersion: formlyVersion,
    }
    $scope.debugInfo.host = $location.host()
    $scope.debugInfo.port = $location.port()

    // Ok clicked
    $scope.okClick = function() {
      $uibModalInstance.close() // promise fulfilled
    }

  }
}
