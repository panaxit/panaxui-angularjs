export default angular.module('app.filters.min', [])
  .filter('min', function() {
    return function(a) {
      return Math.min.apply(this, a);
    };
  })
  .name;
