import angular from 'angular';

class DebugService {
  constructor($uibModal) {
  	var vm = this;

  	vm.show = function(debugInfo) {
			var debugModalInstance = $uibModal.open({
				template: require('./debug.html'),
				controller: 'DebugCtrl',
				size: 'lg',
				resolve: {
					debugInfo: function() {
						return debugInfo;
					}
				}
			});
			debugModalInstance.result.then(function() {
				//$log.info('Debug Modal dismissed at: ' + new Date());
			});
  	};

  }
}

export default angular.module('app.debug.service', [])
  .service('DebugService', DebugService)
  .name;
