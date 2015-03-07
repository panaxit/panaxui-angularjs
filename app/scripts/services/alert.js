'use strict';

/**
 * @ngdoc service
 * @name panaxuiApp.Alert
 * @description
 * # Alert
 * Factory in the panaxuiApp.
 */
angular.module('panaxuiApp')
  .factory('AlertService', function ($modal) {

  	var AlertService = {};

    // show alert
    AlertService.show = function(type, title, body) {
      $modal.open({
        template: '<alert class="px-alert" type="{{type}}"><strong>{{title}}</strong>: {{body}}</alert>',
        controller: function ($scope) {
        	$scope.type = type;
        	$scope.title = title;
        	$scope.body = body;
        },
        size: 'lg'
      });
    };

    return AlertService;
  });
