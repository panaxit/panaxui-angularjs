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

    $urlRouterProvider.otherwise('/');
    
    $breadcrumbProvider.setOptions({
      prefixStateName: 'home'
    });

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
          url: 'category',
          templateUrl: 'views/category.html',
          controller: 'CategoryCtrl',
          ncyBreadcrumb: {
            label: 'Category: {{currentNavBranch.label}}'
          }
      })

      .state('home.grid', {
          url: 'grid',
          templateUrl: 'views/grid.html',
          controller: 'GridCtrl',
          ncyBreadcrumb: {
            label: 'Grid: {{currentNavBranch.label}}'
          }
      })

      .state('home.form', {
          url: 'form',
          templateUrl: 'views/form.html',
          controller: 'FormCtrl',
          ncyBreadcrumb: {
            label: 'Form: {{currentNavBranch.label}}'
          }
      })
    ;
  })
;
