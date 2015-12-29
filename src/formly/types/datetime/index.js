import angular from 'angular'

export default angular.module('app.main.form.formly.type.datetime', [])
  .run(datetime)
  .name

function datetime(formlyConfig) {
  /*
    datetime
   */
  formlyConfig.setType({
    name: 'datetime',
    extends: 'input',
    defaultOptions: {
      templateOptions: {
        type: 'datetime-local',
      },
    },
    controller: function($scope) {
      /**
       * HTML5 input type=date
       * Convert date string to Date object
       */
      var newValue = (function dateConversion(oldValue) {
        if (oldValue) {
          return new Date(oldValue)
        }
        return undefined
      })($scope.model[$scope.options.key])

      // Change in model
      $scope.model[$scope.options.key] = newValue
        // Change original value as well (keep in $pristine)
      $scope.options.value = newValue
    },
  })
}
