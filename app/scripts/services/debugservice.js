'use strict';

/**
 * @ngdoc service
 * @name panaxuiApp.DebugService
 * @description
 * # DebugService
 * Factory in the panaxuiApp.
 */
angular.module('panaxuiApp')
  .factory('DebugService', function ($modal) {

  	var DebugService = {};

  	// show debug modal
  	DebugService.show = function(debugInfo) {
			var debugModalInstance = $modal.open({
				templateUrl: 'views/shell/debug.html',
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

  	return DebugService;
  });
