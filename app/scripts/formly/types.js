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
	    default
     */
    formlyConfigProvider.setType({
      name: 'default',
      extends: 'input',
      templateUrl: 'scripts/formly/default.html'
    });

    /**
     * HTML5 Input Types
     * http://www.w3schools.com/htmL/html_form_input_types.asp
		 *	  color
		 *		date
		 *		datetime
		 *		datetime-local
		 *		email
		 *		month
		 *		number
		 *		range
		 *		search
		 *		tel
		 *		time
		 *		url
		 *		week
		 *
		 * http://www.w3schools.com/tags/att_input_type.asp
		 * 		file
		 * 		...
     */
    
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
	    extends: nomber
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
    /**
     * Date/Time controls
     * ToDo: Use AngularUI alternatives?
     * 	- http://angular-ui.github.io/bootstrap/#/datepicker
     * 	- angular-ui.github.io/bootstrap/#/timepicker
     */
    /*
	    date
     */
    formlyConfigProvider.setType({
      name: 'date',
      extends: 'input',
      defaultOptions: {
      	templateOptions: {
      		type: 'date'
      	}
      }
    });
    /*
	    time
     */
    formlyConfigProvider.setType({
      name: 'time',
      extends: 'input',
      defaultOptions: {
      	templateOptions: {
      		type: 'time'
      	}
      }
    });
    /*
	    datetime
     */
    formlyConfigProvider.setType({
      name: 'datetime',
      extends: 'input',
      defaultOptions: {
      	templateOptions: {
      		type: 'datetime-local'
      	}
      }
    });
    /*
	    color
     */
    formlyConfigProvider.setType({
      name: 'color',
      extends: 'input',
      defaultOptions: {
      	templateOptions: {
      		type: 'color'
      	}
      }
    });
    /*
	    file
	    ToDo: Improve
	    	- https://github.com/danialfarid/ng-file-upload
	    	- https://github.com/nervgh/angular-file-upload
	    	- https://github.com/flowjs/ng-flow
	    ToDo: picture: http://www.w3schools.com/tags/att_input_accept.asp
     */
    formlyConfigProvider.setType({
      name: 'file',
      extends: 'input',
      defaultOptions: {
      	templateOptions: {
      		type: 'file'
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

    /**
     * Custom templates
		 * http://docs.angular-formly.com/v6.4.0/docs/custom-templates
     */

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