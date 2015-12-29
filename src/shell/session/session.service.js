import angular from 'angular'

class SessionService {
  constructor() {
    var vm = this

    vm.create = function(user) {
      //vm.id = user.sessionId;
      vm.panaxInstance = user.data.panaxInstance
      vm.userId = user.data.userId
      vm.username = user.data.username
      vm.api_version = user.data.api_version // eslint-disable-line camelcase
      vm.node_version = user.data.node_version // eslint-disable-line camelcase
      vm.db = user.data.db
        //vm.userRole = 'admin'; //user.userRole;
    }

    vm.destroy = function() {
      //vm.id = null;
      vm.userId = null
      vm.username = null
      vm.api_version = null // eslint-disable-line camelcase
      vm.db = null
        //vm.userRole = null;
    }
  }
}

export default angular.module('app.session.service', [])
  .service('SessionService', SessionService)
  .name
