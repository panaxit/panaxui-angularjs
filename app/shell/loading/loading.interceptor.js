import angular from 'angular';

class LoadingInterceptor {
  constructor($rootScope, $q, LOADING_EVENTS) {
  	var vm = this;
   	
   	vm.numLoadings = 0;
    vm.isLoading = false;

    vm.request = function (config) {
      vm.numLoadings++;
      // Show loader
      if(!vm.isLoading) {
        $rootScope.$broadcast(LOADING_EVENTS.loadingStart);
        vm.isLoading = true;
      }
      return config || $q.when(config);
    };
    
    vm.response = function (response) {
      if ((--vm.numLoadings) === 0) {
        // Hide loader
        if(vm.isLoading) {
          $rootScope.$broadcast(LOADING_EVENTS.loadingEnd);
          vm.isLoading = false;
        }
      }
      return response || $q.when(response);
    };
    
    vm.responseError = function (response) {
      if (!(--vm.numLoadings)) {
        // Hide loader
        if(vm.isLoading) {
          $rootScope.$broadcast(LOADING_EVENTS.loadingEnd);
          vm.isLoading = false;
        }
      }
      return $q.reject(response);
    };

  }
}

LoadingInterceptor.$inject = ['$rootScope', '$q', 'LOADING_EVENTS'];

export default angular.module('app.loading.interceptor', [])
  .service('LoadingInterceptor', LoadingInterceptor)
  .name;