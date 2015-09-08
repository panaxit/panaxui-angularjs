import angular from 'angular';

export default angular.module('app.auth.events', [])
  .constant('AUTH_EVENTS', {
    loginSuccess: 'auth-login-success',
    notAuthenticated: 'auth-not-authenticated',
    logoutSuccess: 'auth-logout-success'
  })
  .name;
