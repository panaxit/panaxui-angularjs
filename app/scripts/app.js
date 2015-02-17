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
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngTouch',
    // 'ngAnimate',
    'ui.router',

    'ui.bootstrap',
    'angularBootstrapNavTree',
    'ncy-angular-breadcrumb',
    'ui.grid.autoResize',
    'ui.grid.pagination',

    'ngUrlify'
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
          templateUrl: 'views/shell/login.html',
          controller: 'LoginCtrl'
      })

      .state('home', {
          url: '/',
          ncyBreadcrumb: {
            label: 'Home'
          },
          templateUrl: 'views/shell/main.html',
          controller: 'MainCtrl'
      })

      .state('home.category', {
          url: 'category/{name}',
          templateUrl: 'views/shell/category.html',
          ncyBreadcrumb: {
            label: '{{navMenuControl.get_selected_branch().label}}'
          }
      })

      .state('home.panel', {
          templateUrl: 'views/shell/panel.html',
          ncyBreadcrumb: {
            label: '{{navMenuControl.get_parent_branch(navMenuControl.get_selected_branch()).label}}'
          }
      })

      .state('home.panel.grid', {
          url: 'grid/{catalogName}/{mode}',
          templateUrl: 'views/grid.html',
          controller: 'GridCtrl',
          ncyBreadcrumb: {
            label: '{{navMenuControl.get_selected_branch().label}}'
          }
      })

      .state('home.panel.form', {
          url: 'form/{catalogName}/{mode}',
          templateUrl: 'views/form.html',
          controller: 'FormCtrl',
          ncyBreadcrumb: {
            label: '{{navMenuControl.get_selected_branch().label}}'
          }
      })
    ;
  })
;
