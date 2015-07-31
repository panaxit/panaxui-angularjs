import angular from 'angular';

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
    controller: function () {}
  };
}

export default angular.module('app.directives.pxcards', [])
  .directive('pxCards', pxCards)
  .name;
