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

    'ngUrlify',
    'angular-md5'
  ])

  .config(function config($httpProvider, $stateProvider, $urlRouterProvider, $breadcrumbProvider) {

    // Authentication interceptor
    $httpProvider.interceptors.push([
      '$injector',
      function ($injector) {
        return $injector.get('AuthInterceptor');
      }
    ]);

    // Fallback URL Route
    $urlRouterProvider.otherwise('/');
    
    // Always show 'Home' root in breadcrumb
    $breadcrumbProvider.setOptions({
      prefixStateName: 'main'
    });

    // Set up states
    $stateProvider

      .state('login', {
          url: '/login',
          templateUrl: 'views/shell/login.html',
          controller: 'LoginCtrl'
      })

      .state('main', {
          abstract: true,
          templateUrl: 'views/shell/main.html',
          controller: 'MainCtrl',
          data: {
            authRequired: true
          },
          ncyBreadcrumb: {
            label: 'Home'
          }
      })

      .state('main.home', {
          url: '/',
          templateUrl: 'views/shell/home.html'
      })

      .state('main.category', {
          url: 'category/{name}',
          templateUrl: 'views/shell/category.html',
          controller: 'CategoryCtrl',
          ncyBreadcrumb: {
            label: '{{currentBranch.label}}'
          }
      })

      .state('main.panel', {
          templateUrl: 'views/shell/panel.html',
          controller: 'PanelCtrl',
          ncyBreadcrumb: {
            skip: true
          }
      })

      .state('main.panel.grid', {
          url: 'grid/{catalogName}/{mode}',
          templateUrl: 'views/grid.html',
          controller: 'GridCtrl',
          ncyBreadcrumb: {
            label: '{{currentBranch.label}}'
          }
      })

      .state('main.panel.form', {
          url: 'form/{catalogName}/{mode}',
          templateUrl: 'views/form.html',
          controller: 'FormCtrl',
          ncyBreadcrumb: {
            label: '{{currentBranch.label}}'
          }
      })

      .state('main.panel.cards', {
          url: 'cards/{catalogName}/{mode}',
          templateUrl: 'views/cards.html',
          //controller: 'CardsCtrl',
          ncyBreadcrumb: {
            label: '{{currentBranch.label}}'
          }
      })
    ;
  })

  .constant('AUTH_EVENTS', {
    loginSuccess: 'auth-login-success',
    //loginFailed: 'auth-login-failed',
    sessionTimeout: 'auth-session-timeout',
    notAuthenticated: 'auth-not-authenticated',
    logoutSuccess: 'auth-logout-success'
  })
  
  .run(function ($rootScope, $state, AUTH_EVENTS, AuthService) {

    $rootScope.$on('$stateChangeStart', function (event, next) {
      if(next.data && next.data.authRequired) {
        if (!AuthService.isAuthenticated()) {
          event.preventDefault();
          $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
        }
      }
    });

    $rootScope.$on('auth-login-success', function (event, next) {
      console.info("#EVENT: auth-login-success");
      $state.go("main.home");
    });

    //$rootScope.$on('auth-login-failed', function (event, next) {
    //  console.info("#EVENT: auth-login-failed");
    //});

    $rootScope.$on('auth-session-timeout', function (event, next) {
      console.info("#EVENT: auth-session-timeout");
      $state.go("login");
    });

    $rootScope.$on('auth-not-authenticated', function (event, next) {
      console.info("#EVENT: auth-not-authenticated");
      $state.go("login");
    });

    $rootScope.$on('auth-logout-success', function (event, next) {
      console.info("#EVENT: auth-logout-success");
      $state.go("login");
    });

  })
;
