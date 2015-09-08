import angular from 'angular';

class SessionService {
  constructor() {
  	var vm = this;

		vm.create = function(user) {
			//vm.id = user.sessionId;
      vm.panax_instance = user.data.panax_instance;
      vm.userId = user.data.userId;
			vm.username = user.data.username;
      vm.api_version = user.data.api_version;
      vm.node_version = user.data.node_version;
			vm.db = user.data.db;
			//vm.userRole = 'admin'; //user.userRole;
		};

		vm.destroy = function() {
			//vm.id = null;
			vm.userId = null;
			vm.username = null;
			vm.api_version = null;
			vm.db = null;
			//vm.userRole = null;
		};
  }
}

SessionService.$inject = [];

export default angular.module('app.session.service', [])
  .service('SessionService', SessionService)
  .name;
