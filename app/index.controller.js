export default class IndexCtrl {
  constructor($scope, $rootScope, $state, $q, AuthService, AlertService) {

    /**
     * At first load ensure it's already logged in (by getting session info)
     */
    var _firstLoad = true;
    AuthService.sessionInfo().then(function () {
      _firstLoad = false;
      $state.go("main.home");
    }, function (res) {
      $rootScope.panax_instances = res.data.instances;
      _firstLoad = false;
      $state.go("login");
    });

    /**
     * Loading Events listeners
     */
    var loadingDefer;
    // At HTTP requests
    $scope.$on('loading-start',function(){
       loadingDefer = $q.defer();
       $rootScope.azPromise = loadingDefer.promise;
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
    $scope.$on('auth-not-authenticated', function (event, next) {
      console.info("#EVENT: auth-not-authenticated");
      // Avoid showing 'Session Timeout' on first load of app
      if(!_firstLoad) {
        AlertService.show('warning', 'Authentication', next.data.message);
      }
      // Force logout to get available panax instances
      AuthService.logout().then(function (res) {
        $rootScope.panax_instances = res.data.instances;
      });
      // Go to 'login' state
      $state.go("login");
    });
    $scope.$on('auth-logout-success', function (event, next) {
      console.info("#EVENT: auth-logout-success");
      AlertService.show('success', 'Authentication', 'Succesfully Logged Out');
      // Logout and get available panax instances
      AuthService.logout().then(function (res) {
        $rootScope.panax_instances = res.data.instances;
      });
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
