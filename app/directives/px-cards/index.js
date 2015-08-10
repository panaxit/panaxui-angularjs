import angular from 'angular';

import dirPagination from 'angular-utils-pagination';

function pxCards() {
  return {
    restrict: 'E',
    template: require('./pxcards.html'),
    scope: {
      mode: '@',
      data: '=',
      catalog: '=',
      loader: '&',
      openHandler: '&'
    },
    bindToController: true,
    controllerAs: 'vm',
    controller: function () {
      var vm = this;

      // Default options
      vm.options = {};
      vm.options.paginationPageSizes = [4, 8, 16, 32, 64, 128];
      vm.options.paginationPageSize = 8;
    }
  };
}

export default angular.module('app.directives.pxcards', [
    'angularUtils.directives.dirPagination'
  ])
  .directive('pxCards', pxCards)
  .name;
