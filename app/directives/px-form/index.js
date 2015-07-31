import angular from 'angular';

import formly from 'angular-formly';
import formlyBootstrap from 'angular-formly-templates-bootstrap';

function pxForm() {
  return {
    restrict: 'E',
    template: require('./pxform.html'),
    scope: {
      catalog: '=',
      data: '=',
      fields: '=',
      form: '=',
      loader: '&',
      resetHandler: '&',
      cancelHandler: '&',
      submitHandler: '&'
    },
    bindToController: true,
    controllerAs: 'vm',
    controller: function () {}
  };
}

export default angular.module('app.directives.pxform', [
    formly,
    formlyBootstrap
  ])
  .directive('pxForm', pxForm)
  .name;
