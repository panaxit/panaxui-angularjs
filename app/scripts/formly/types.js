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
    // /*
	   //  date
	   //  extends: datetime
     //  ToDo: Restore as date HTML5 fallback
    //  */
    // formlyConfigProvider.setType({
    //   name: 'date',
    //   extends: 'datetime',
    //   defaultOptions: {
    //   	templateOptions: {
    //   		type: 'date'
    //   	}
    //   }
    // });
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
          valueProp: 'value',
          labelProp: 'label',
        },
        controller: function($scope, CRUDService) {
        	// Async loading
	        var loadAsync = function () {
	          $scope.to.loading = CRUDService.options($scope.to.params).then(function(res) {
	          	// Load options
	            $scope.to.options = res;
	            // Set foreign entity values (cascaded)
	            // http://angular-formly.com/#/example/other/filter-select
	            if($scope.to.params.foreignEntity) {
	            	if($scope.model.hasOwnProperty($scope.to.params.foreignEntity)) {
	            		$scope.model[$scope.to.params.foreignEntity] = $scope.to.params.foreignValue;
	            	} else if($scope.formState.hasOwnProperty($scope.to.params.foreignEntity)) {
	            		$scope.formState[$scope.to.params.foreignEntity] = $scope.to.params.foreignValue;
	            	}
	            }
	            return res;
	          });
	        };
	        loadAsync();
	        // ToDo alternative: Async alternative: Use ui-select's `refresh` functionality
	        // https://github.com/angular-ui/ui-select/wiki/ui-select-choices

          // Watcher foreign entity (cascade)
          if($scope.to.params.foreignEntity) {
	          var watcher = function (newValue, oldValue, theScope) {
	          	if(newValue !== oldValue) {
	          		//console.log($scope.options.key+': foreignEntity `' +$scope.to.params.foreignEntity+'` changed from: '+oldValue+' to: '+newValue)
	          		// Set own value
		          	$scope.to.params.foreignValue = newValue;
		          	// Set own value to empty in `model` or `formState`
		          	// Avoid when first-time (!oldValue)
		          	if($scope.model[$scope.options.key] && oldValue) {
		          		$scope.model[$scope.options.key] = '';
		          	} else if($scope.formState[$scope.options.key] && oldValue) {
		          		$scope.formState[$scope.options.key] = '';
		          	}
		          	// Reload options
		        		loadAsync();
	          	}
	          };
	          // Watch in `model` or `formState`
	          // http://angular-formly.com/#/example/other/filter-select
	          $scope.$watch('formState.' + $scope.to.params.foreignEntity, watcher);
	          $scope.$watch('model.' + $scope.to.params.foreignEntity, watcher);
	        }
        }
      }
    });

    /*
    datepicker
    (https://github.com/formly-js/angular-formly-website/issues/15#issuecomment-103467421)
     */

    var attributes = [
      'date-disabled',
      'custom-class',
      'show-weeks',
      'starting-day',
      'init-date',
      'min-mode',
      'max-mode',
      'format-day',
      'format-month',
      'format-year',
      'format-day-header',
      'format-day-title',
      'format-month-title',
      'year-range',
      'shortcut-propagation',
      'datepicker-popup',
      'show-button-bar',
      'current-text',
      'clear-text',
      'close-text',
      'close-on-date-selection',
      'datepicker-append-to-body'
    ];

    var bindings = [
      'datepicker-mode',
      'min-date',
      'max-date'
    ];

    var ngModelAttrs = {};

    angular.forEach(attributes, function(attr) {
      ngModelAttrs[camelize(attr)] = {attribute: attr};
    });

    angular.forEach(bindings, function(binding) {
      ngModelAttrs[camelize(binding)] = {bound: binding};
    });

    function camelize(string) {
      string = string.replace(/[\-_\s]+(.)?/g, function(match, chr) {
        return chr ? chr.toUpperCase() : '';
      });
      // Ensure 1st char is always lowercase
      return string.replace(/^([A-Z])/, function(match, chr) {
        return chr ? chr.toLowerCase() : '';
      });
    }

    formlyConfigProvider.setType({
      name: 'date',
      templateUrl: 'scripts/formly/datepicker.html',
      wrapper: ['bootstrapLabel', 'bootstrapHasError'],
      defaultOptions: {
        ngModelAttrs: ngModelAttrs,
        templateOptions: {
          type: 'text',
          datepickerPopup: 'dd-MMMM-yyyy',
          addonLeft: {
            class: 'glyphicon glyphicon-calendar',
            onClick: function(options, scope) {
              options.templateOptions.isOpen = !options.templateOptions.isOpen;
            }
          },
          onFocus: function($viewValue, $modelValue, scope) {
            scope.to.isOpen = !scope.to.isOpen;
          },
          datepickerOptions: {}
        }
      }
    });

	});
