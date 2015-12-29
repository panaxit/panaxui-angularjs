export default class AppCtrl {
  constructor($scope, $rootScope, $state, $q, AuthService, AlertService) {
    var _firstLoad = true
    var loadingDefer

    /**
     * At first load ensure it's already logged in (by getting session info)
     */
    AuthService.sessionInfo().then(function() {
      _firstLoad = false
      $state.go('main.home')
    }, function(res) {
      $rootScope.panaxInstances = res.data.instances
      _firstLoad = false
      $state.go('login')
    })

    /**
     * Loading Events listeners
     */
      // At HTTP requests
    $scope.$on('loading-start', function() {
      loadingDefer = $q.defer()
      $rootScope.azPromise = loadingDefer.promise
    })
    $scope.$on('loading-end', function() {
      loadingDefer.resolve()
    })

    /**
     * Authentication Events listeners
     */
    $scope.$on('auth-login-success', function() {
      console.info('#EVENT: auth-login-success') // eslint-disable-line no-console
      $state.go('main.home')
    })
    $scope.$on('auth-not-authenticated', function(event, next) {
      console.info('#EVENT: auth-not-authenticated') // eslint-disable-line no-console
        // Avoid showing 'Session Timeout' on first load of app
      if (!_firstLoad) {
        AlertService.show('warning', 'Authentication', next.data.message)
      }
      // Force logout to get available panax instances
      AuthService.logout().then(function(res) {
        $rootScope.panaxInstances = res.data.instances
      })
      // Go to 'login' state
      $state.go('login')
    })
    $scope.$on('auth-logout-success', function() {
      console.info('#EVENT: auth-logout-success') // eslint-disable-line no-console
      AlertService.show('success', 'Authentication', 'Succesfully Logged Out')
        // Logout and get available panax instances
      AuthService.logout().then(function(res) {
        $rootScope.panaxInstances = res.data.instances
      })
      $state.go('login')
    })

    /**
     * Error Events listeners
     */
    $scope.$on('error-internal-server', function(event, next) {
      console.info('#EVENT: error-internal-server') // eslint-disable-line no-console
      AlertService.show('danger', 'Error', next.data.message)
    })
  }
}
