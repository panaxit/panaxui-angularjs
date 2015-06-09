'use strict';

/**
 * @ngdoc service
 * @name panaxuiApp.LoadingInterceptor
 * @description
 * # LoadingInterceptor
 * Factory in the panaxuiApp.
 */
angular.module('panaxuiApp')
  .factory('LoadingInterceptor', function($rootScope, $q, LOADING_EVENTS) {
    var numLoadings = 0;
    var isLoading = false;

    return {
      request: function (config) {
        numLoadings++;
        // Show loader
        if(!isLoading) {
          $rootScope.$broadcast(LOADING_EVENTS.loadingStart);
          isLoading = true;
        }
        return config || $q.when(config)
      },
      response: function (response) {
        if ((--numLoadings) === 0) {
          // Hide loader
          if(isLoading) {
            $rootScope.$broadcast(LOADING_EVENTS.loadingEnd);
            isLoading = false;
          }
        }
        return response || $q.when(response);
      },
      responseError: function (response) {
        if (!(--numLoadings)) {
          // Hide loader
          if(isLoading) {
            $rootScope.$broadcast(LOADING_EVENTS.loadingEnd);
            isLoading = false;
          }
        }
        return $q.reject(response);
      }
    };
  })
  .constant('LOADING_EVENTS', {
    loadingStart: 'loading-start',
    loadingEnd: 'loading-end'
  });
