'use strict';

/**
 * @ngdoc overview
 * @name panaxuiApp
 * @description
 * # panaxuiApp
 *
 * Main module of the application.
 */
angular
  .module('panaxuiApp', [
    // 'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngTouch',
    'ui.router',
    'ui.bootstrap',
    'angularBootstrapNavTree',
    'ui.grid.autoResize',
    'ui.grid.pagination'
  ])
  .config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');
    
    $stateProvider
      .state('home', {
          url: '/',
          templateUrl: 'views/main.html',
          controller: 'MainCtrl'
      })
      .state('login', { //logout?
          url: '/login',
          templateUrl: 'views/login.html',
          controller: 'LoginCtrl'
      })
      .state('about', {
          // we'll get to this in a bit       
      });
      
  });
