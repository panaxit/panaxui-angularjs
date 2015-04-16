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
    'ui.grid.autoResize',
    'ui.grid.pagination',
    'ui.grid.selection',

    'ngUrlify',
    'angular-md5',

    'schemaForm',

    // https://github.com/networknt/angular-schema-form-ui-select
    'ui.select',
    'pascalprecht.translate',
    'angular-underscore/filters',
    'ui.sortable'
  ])

  .config(function config($httpProvider, $stateProvider, $urlRouterProvider) {

    /**
     * HTTP Interceptors
     */
    $httpProvider.interceptors.push('ErrorInterceptor');
    $httpProvider.interceptors.push('AuthInterceptor');

    /**
     * UI Router
     */

    // Fallback URL Route
    // Bug Fix: https://github.com/angular-ui/ui-router/issues/1022
    //$urlRouterProvider.otherwise('/');
    $urlRouterProvider.otherwise(function($injector) {
      var $state = $injector.get('$state');
      $state.go('main.home');
    });

    // Set up states
    $stateProvider

      /*
      Login state
       */
      .state('login', {
          url: '/login',
          templateUrl: 'views/shell/login.html'
      })

      /*
      Main `abstract` root state
       */
      .state('main', {
          abstract: true,
          templateUrl: 'views/shell/main.html',
          controller: 'MainCtrl',
          data: {
            authRequired: true
          }
      })

      /*
      Home state
       */
      .state('main.home', {
          url: '/',
          templateUrl: 'views/shell/home.html'
      })

      /*
      Category state
       */
      .state('main.category', {
          url: 'category/{name}',
          templateUrl: 'views/shell/category.html',
          controller: 'CategoryCtrl'
      })

      /*
      Panel `parent` state
       */
      .state('main.panel', {
          templateUrl: 'views/shell/panel.html'
      })

      /*
      Grid `abstract` state
       */
      .state('main.panel.grid', {
        abstract: true,
        url: 'grid/{catalogName}/{mode}',
        controller: 'GridCtrl',
        templateUrl: 'views/grid.html'
      })

      /*
      GridView state
       */
      .state('main.panel.grid.view', {
          views: {
            'main': {
              templateUrl: 'views/grid.main.html'
            },
            'footer': {
              templateUrl: 'views/grid.footer.html'
            }
          }
      })

      /*
      Form `abstract` state
       */
      .state('main.panel.form', {
        abstract: true,
        url: 'form/{catalogName}/{mode}/{id}',
        controller: 'FormCtrl',
        templateUrl: 'views/form.html'
      })

      /*
      FormView state
       */
      .state('main.panel.form.view', {
          views: {
            'main': {
              templateUrl: 'views/form.main.html'
            },
            'footer': {
              templateUrl: 'views/form.footer.html'
            }
          }
      })

      // .state('main.panel.cardsView', {
      //     url: 'cards/{catalogName}/{mode}',
      //     templateUrl: 'views/cards.html',
      //     controller: 'CardsCtrl'
      // })

      // filters: https://github.com/angular-ui/ui-router/wiki/Multiple-Named-Views
      // .state('main.panel.filtersView', {
      //     url: 'filters/{catalogName}/{mode}',
      //     views: {
      //       'filters':
      //       'results':
      //     }
      // })
    ;
  })

  .constant('ERROR_EVENTS', {
    internalServer: 'error-internal-server'
  })

  .constant('AUTH_EVENTS', {
    loginSuccess: 'auth-login-success',
    //loginFailed: 'auth-login-failed',
    sessionTimeout: 'auth-session-timeout',
    notAuthenticated: 'auth-not-authenticated',
    logoutSuccess: 'auth-logout-success'
  })
  
  // Try to see if it's already logged in by getting session info
  .run(function ($rootScope, $state, AUTH_EVENTS, AuthService) {
    AuthService.sessionInfo().then(function () {
      $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
      $state.go("main.home"); // redundant?
    });
  })

  .run(function ($rootScope, $state, AUTH_EVENTS, AuthService, AlertService) {

    /**
     * State change listener
     */
    
    $rootScope.$on('$stateChangeStart', function (event, next) {
      if(next.data && next.data.authRequired) {
        if (!AuthService.isAuthenticated()) {
          event.preventDefault();
          //$rootScope.$broadcast(AUTH_EVENTS.notAuthenticated); // redundant
        }
      } else if (AuthService.isAuthenticated()) {
        $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
        $state.go("main.home"); // redundant?
      }
    });
    
    /**
     * Error Events listeners
     */
    
    $rootScope.$on('error-internal-server', function (event, next) {
      console.info("#EVENT: error-internal-server");
      AlertService.show('danger', 'Error', next.data.message);
    });
    
    /**
     * Authentication Events listeners
     */
    
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
      AlertService.show('warning', 'Authentication', next.data.message);
      $state.go("login");
    });
    $rootScope.$on('auth-logout-success', function (event, next) {
      console.info("#EVENT: auth-logout-success");
      $state.go("login");
    });
  })
;
