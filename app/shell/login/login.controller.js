export default class LoginCtrl {
  constructor($scope, $rootScope, AUTH_EVENTS, AuthService, md5) {
  	var vm = this;

		vm.credentials = {
			username: '',
			password: ''
		};

		vm.login = function(credentials) {
			AuthService.login({
				username: credentials.username,
				password: md5.createHash(credentials.password)
			}).then(function(user) {
				$rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
			//}, function() {
			//	$rootScope.$broadcast(AUTH_EVENTS.loginFailed);
			});
		};
  }
}

LoginCtrl.$inject = ['$scope', '$rootScope', 'AUTH_EVENTS', 'AuthService', 'md5'];