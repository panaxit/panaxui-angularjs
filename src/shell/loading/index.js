import angular from 'angular'

import LoadingInterceptor from './loading.interceptor'
import LoadingEvents from './loading.events'

export default angular.module('app.loading', [
  LoadingInterceptor,
  LoadingEvents,
])
  .config(function interceptors($httpProvider) {
    $httpProvider.interceptors.push('LoadingInterceptor')
  })
  .name
