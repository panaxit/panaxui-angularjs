import angular from 'angular'

export default angular.module('app.filters.min', [])
  .filter('min', function($window) {
    return function(a) {
      return $window.Math.min.apply($window.Math, a)
    }
  })
  .name
