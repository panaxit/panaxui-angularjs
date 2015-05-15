'use strict';

/**
 * Custom Templates for angular-formly
 */
angular.module('panaxuiApp')
	.config(function config(formlyConfigProvider) {
    /*
	    input
     */
    formlyConfigProvider.setType({
      name: 'input',
      overwriteOk: true,
      templateUrl: 'scripts/formly/input.html',
      wrapper: ['bootstrapLabel', 'bootstrapHasError']
    });
    /*
	    number
     */
    formlyConfigProvider.setType({
      name: 'number',
      extends: 'input',
      defaultOptions: {
      	templateOptions: {
      		type: 'number'
      	}
      }
    });
    /*
	    money
     */
    formlyConfigProvider.setType({
      name: 'money',
      extends: 'number',
      templateUrl: 'scripts/formly/money.html'
    });
    /*
	    email
     */
    formlyConfigProvider.setType({
      name: 'email',
      extends: 'input',
      defaultOptions: {
      	templateOptions: {
      		type: 'email'
      	}
      }
    });
    /*
	    password
     */
    formlyConfigProvider.setType({
      name: 'password',
      extends: 'input',
      defaultOptions: {
      	templateOptions: {
      		type: 'password'
      	}
      }
    });
    /*
	    url
     */
    formlyConfigProvider.setType({
      name: 'url',
      extends: 'input',
      defaultOptions: {
      	templateOptions: {
      		type: 'url'
      	}
      }
    });
    /*
	    async_select
	    Extends select template
     */
    formlyConfigProvider.setType({
      name: 'async_select',
      extends: 'select',
      defaultOptions: {
        templateOptions: {
          options: [],
          valueProp: "value",
          labelProp: "label",
        },
        controller: function($scope, CRUDService) {
          $scope.to.loading = CRUDService.options($scope.to.params).then(function(res) {
            $scope.to.options = res;
            // note, the line above is shorthand for:
            // $scope.options.templateOptions.options = data;
            return res;
          });
        }
      }
    });
	});