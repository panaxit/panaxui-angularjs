export default class LoginCtrl {
  constructor($rootScope, AUTH_EVENTS, AuthService, md5) {
    var vm = this

    $rootScope.$watch('panaxInstances', function(instances) {
      if (instances) {
        vm.panaxInstances = instances
        vm.credentials.instance = instances[0]
      }
    })

    vm.credentials = {
      username: '',
      password: '',
      instance: '',
    }

    vm.login = function(credentials) {
      AuthService.login({
        username: credentials.username,
        password: md5.createHash(credentials.password),
        instance: credentials.instance,
      }).then(function() {
        $rootScope.$broadcast(AUTH_EVENTS.loginSuccess)
          //}, function() {
          //	$rootScope.$broadcast(AUTH_EVENTS.loginFailed);
      })
    }
  }
}
