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
     * ToDo: Use AngularUI alternatives? (some HTML5 input types not tupported by IE)
     * 	- http://angular-ui.github.io/bootstrap/#/datepicker
     * 	- angular-ui.github.io/bootstrap/#/timepicker
     */
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
      },
      controller: function ($scope) {
      	/**
      	 * HTML5 input type=date
      	 * Convert date string to Date object
      	 */
      	var newValue = (function dateConversion(oldValue) {
      		if(oldValue) {
      			return new Date(oldValue);
      		}
      		return undefined;
      	})($scope.model[$scope.options.key]);

      	// Change in model
      	$scope.model[$scope.options.key] = newValue;
      	// Change original value as well (keep in $pristine)
      	$scope.options.value = newValue;
      }
    });
    /*
	    date
	    extends: datetime
     */
    formlyConfigProvider.setType({
      name: 'date',
      extends: 'datetime',
      defaultOptions: {
      	templateOptions: {
      		type: 'date'
      	}
      }
    });
    /*
	    time
	    extends: datetime
     */
    formlyConfigProvider.setType({
      name: 'time',
      extends: 'input',
      defaultOptions: {
      	templateOptions: {
      		type: 'time'
      	}
      },
      controller: function ($scope) {
      	/**
      	 * HTML5 input type=time
      	 * Convert time string to Date object
      	 */
      	var newValue = (function timeConversion(oldValue) {
      		if(oldValue) {
	      		// John Resig's: 
	      		// http://stackoverflow.com/questions/141348/what-is-the-best-way-to-parse-a-time-into-a-date-object-from-user-input-in-javas
	      		var d = new Date();
	      		var time = oldValue.match(/(\d+)(?::(\d\d))?\s*(p?)/);
	      		d.setHours( parseInt(time[1]) + (time[3] ? 12 : 0) );
	      		d.setMinutes( parseInt(time[2]) || 0 );
	      		return d;
      		}
      		return undefined;
      	})($scope.model[$scope.options.key]);

      	// Change in model
      	$scope.model[$scope.options.key] = newValue;
      	// Change original value as well (keep in $pristine)
      	$scope.options.value = newValue;
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
	    select
     */
    formlyConfigProvider.setType({
      name: 'select',
      overwriteOk: true,
      templateUrl: 'scripts/formly/select.html',
      wrapper: ['bootstrapLabel', 'bootstrapHasError']
    });

    /*
	    async_select
	    Extends select
	    use ui-select (https://github.com/angular-ui/ui-select)
     */
    formlyConfigProvider.setType({
      name: 'async_select',
      extends: 'select',
      templateUrl: 'scripts/formly/async_select.html',
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
        // ToDo: Async alternative: Use ui-select's `refresh` functionality
        // https://github.com/angular-ui/ui-select/wiki/ui-select-choices
      }
    });
	});