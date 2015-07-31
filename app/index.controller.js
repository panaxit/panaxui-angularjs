export default class IndexCtrl {
  constructor($scope, $state, $q, AuthService, AlertService) {
    var vm = this;

    /**
     * Ensure it's already logged in (by getting session info)
     */
    AuthService.sessionInfo().then(function () {
      $state.go("main.home");
    }, function () {
      $state.go("login");
    });

    /**
     * Loading Events listeners
     */
    var loadingDefer;
    // At HTTP requests
    $scope.$on('loading-start',function(){
       loadingDefer = $q.defer();
       vm.azPromise = loadingDefer.promise;
    });
    $scope.$on('loading-end', function(){
       loadingDefer.resolve();
    });

    /**
     * Authentication Events listeners
     */
    $scope.$on('auth-login-success', function (event, next) {
      console.info("#EVENT: auth-login-success");
      $state.go("main.home");
    });
    //$scope.$on('auth-login-failed', function (event, next) {
    //  console.info("#EVENT: auth-login-failed");
    //});
    $scope.$on('auth-session-timeout', function (event, next) {
      console.info("#EVENT: auth-session-timeout");
      $state.go("login");
    });
    $scope.$on('auth-not-authenticated', function (event, next) {
      console.info("#EVENT: auth-not-authenticated");
      AlertService.show('warning', 'Authentication', next.data.message);
      $state.go("login");
    });
    $scope.$on('auth-logout-success', function (event, next) {
      console.info("#EVENT: auth-logout-success");
      $state.go("login");
    });

    /**
     * Error Events listeners
     */
    $scope.$on('error-internal-server', function (event, next) {
      console.info("#EVENT: error-internal-server");
      AlertService.show('danger', 'Error', next.data.message);
    });
  }
}

IndexCtrl.$inject = ['$scope', '$state', '$q', 'AuthService', 'AlertService'];
