import angular from 'angular'

import ErrorInterceptor from './error.interceptor'
import ErrorEvents from './error.events'

export default angular.module('app.error', [
  ErrorInterceptor,
  ErrorEvents,
])
  .config(function interceptors($httpProvider) {
    $httpProvider.interceptors.push('ErrorInterceptor')
  })
  .name
