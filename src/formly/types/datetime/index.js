export default angular.module('app.main.form.formly.type.datetime', [])
  .run(datetime)
  .name;

function datetime(formlyConfig) {
  /*
    datetime
   */
  formlyConfig.setType({
    name: 'datetime',
    extends: 'input',
    defaultOptions: {
      templateOptions: {
        type: 'datetime-local'
      }
    },
    controller: function ($scope) {
      /**
       * HTML5 input type=date
       * Convert date string to Date object
       */
      var newValue = (function dateConversion(oldValue) {
        if(oldValue) {
          return new Date(oldValue);
        }
        return undefined;
      })($scope.model[$scope.options.key]);

      // Change in model
      $scope.model[$scope.options.key] = newValue;
      // Change original value as well (keep in $pristine)
      $scope.options.value = newValue;
    }
  });
  // /*
  //   date
  //   extends: datetime
  //   ToDo: Restore as date HTML5 fallback
  //  */
  // formlyConfigProvider.setType({
  //   name: 'date',
  //   extends: 'datetime',
  //   defaultOptions: {
  //     templateOptions: {
  //       type: 'date'
  //     }
  //   }
  // });
  /*
    time
    extends: datetime
   //  ToDo: Restore as time HTML5 fallback
   */
  // formlyConfigProvider.setType({
  //   name: 'time',
  //   extends: 'input',
  //   defaultOptions: {
  //    templateOptions: {
  //      type: 'time'
  //    }
  //   },
  //   controller: function ($scope) {
  //    /**
  //     * HTML5 input type=time
  //     * Convert time string to Date object
  //     */
  //    var newValue = (function timeConversion(oldValue) {
  //      if(oldValue) {
   //       // John Resig's:
   //       // http://stackoverflow.com/questions/141348/what-is-the-best-way-to-parse-a-time-into-a-date-object-from-user-input-in-javas
   //       var d = new Date();
   //       var time = oldValue.match(/(\d+)(?::(\d\d))?\s*(p?)/);
   //       d.setHours( parseInt(time[1]) + (time[3] ? 12 : 0) );
   //       d.setMinutes( parseInt(time[2]) || 0 );
   //       return d;
  //      }
  //      return undefined;
  //    })($scope.model[$scope.options.key]);

  //    // Change in model
  //    $scope.model[$scope.options.key] = newValue;
  //    // Change original value as well (keep in $pristine)
  //    $scope.options.value = newValue;
  //   }
  // });
  // /*
   //  color
   //  ToDo: Restore as color HTML5 fallback
  //  */
  // formlyConfigProvider.setType({
  //   name: 'color',
  //   extends: 'input',
  //   defaultOptions: {
  //    templateOptions: {
  //      type: 'color'
  //    }
  //   }
  // });
}
