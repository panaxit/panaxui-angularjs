import angular from 'angular';

export default angular.module('app.auth.events', [])
  .constant('AUTH_EVENTS', {
    loginSuccess: 'auth-login-success',
    //loginFailed: 'auth-login-failed',
    sessionTimeout: 'auth-session-timeout',
    notAuthenticated: 'auth-not-authenticated',
    logoutSuccess: 'auth-logout-success'
  })
  .name;