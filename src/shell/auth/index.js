import angular from 'angular';

import AuthInterceptor from './auth.interceptor';
import AuthEvents from './auth.events';
import AuthService from './auth.service';

export default angular.module('app.auth', [
		AuthInterceptor,
		AuthEvents,
		AuthService
	])
	.config(function interceptors($httpProvider) {
	  $httpProvider.interceptors.push('AuthInterceptor');
	})
	.name;