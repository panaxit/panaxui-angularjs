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
    'ncy-angular-breadcrumb',
    'ui.grid.autoResize',
    'ui.grid.pagination'
  ])

  .config(function config($stateProvider, $urlRouterProvider, $breadcrumbProvider) {

    // Fallback URL Route
    $urlRouterProvider.otherwise('/');
    
    // Always show 'Home' root in breadcrumb
    $breadcrumbProvider.setOptions({
      prefixStateName: 'home'
    });

    // Set up states
    $stateProvider

      .state('login', { //logout?
          url: '/login',
          templateUrl: 'views/login.html',
          controller: 'LoginCtrl'
      })

      .state('home', {
          url: '/',
          ncyBreadcrumb: {
            label: 'Home'
          },
          templateUrl: 'views/main.html',
          controller: 'MainCtrl'
      })

      .state('home.category', {
          url: 'category/{name}',
          templateUrl: 'views/category.html',
          controller: 'CategoryCtrl',
          ncyBreadcrumb: {
            label: 'Category: {{currentNavBranch.label}}'
          }
      })

      .state('home.grid', {
          url: 'grid/{catalogName}/{mode}',
          templateUrl: 'views/grid.html',
          controller: 'GridCtrl',
          ncyBreadcrumb: {
            label: 'Grid: {{currentNavBranch.label}}'
          }
      })

      .state('home.form', {
          url: 'form/{catalogName}/{mode}',
          templateUrl: 'views/form.html',
          controller: 'FormCtrl',
          ncyBreadcrumb: {
            label: 'Form: {{currentNavBranch.label}}'
          }
      })
    ;
  })
;
