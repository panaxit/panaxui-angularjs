import angular from 'angular'
import ngSanitize from 'angular-sanitize'
import 'ui-select'
import 'ui-select/dist/select.css'

export default angular.module('app.main.form.formly.type.asyncSelect', [
  ngSanitize,
  'ui.select',
])
  .run(asyncSelect)
  .name

function asyncSelect(formlyConfig) {
  /*
    asyncSelect
    Extends select
    use ui-select (https://github.com/angular-ui/ui-select)
   */
  formlyConfig.setType({
    name: 'asyncSelect',
    extends: 'select',
    template: require('./template.html'),
    defaultOptions: {
      templateOptions: {
        options: [],
        valueProp: 'value',
        labelProp: 'label',
      },
      controller: function($scope, CRUDService) {
        var loadAsync, watcher
        // Async loading
        loadAsync = function() {
          $scope.to.loading = CRUDService.options($scope.to.params).then(function(res) {
            // Load options
            $scope.to.options = res
              // Set foreign entity values (cascaded)
              // http://angular-formly.com/#/example/other/filter-select
            if ($scope.to.params.foreignEntity) {
              if ($scope.model.hasOwnProperty($scope.to.params.foreignEntity)) {
                $scope.model[$scope.to.params.foreignEntity] = $scope.to.params.foreignValue
              } else if ($scope.formState.hasOwnProperty($scope.to.params.foreignEntity)) {
                $scope.formState[$scope.to.params.foreignEntity] = $scope.to.params.foreignValue
              }
            }
            return res
          })
        }
        loadAsync()
        // ToDo alternative: Async alternative: Use ui-select's `refresh` functionality
        // https://github.com/angular-ui/ui-select/wiki/ui-select-choices

        // Watcher foreign entity (cascade)
        if ($scope.to.params.foreignEntity) {
          watcher = function(newValue, oldValue) {
            if (newValue !== oldValue) {
              // Set own value
              $scope.to.params.foreignValue = newValue
              // Set own value to empty in `model` or `formState`
              // Avoid when first-time (!oldValue)
              if ($scope.model[$scope.options.key] && oldValue) {
                $scope.model[$scope.options.key] = ''
              } else if ($scope.formState[$scope.options.key] && oldValue) {
                $scope.formState[$scope.options.key] = ''
              }
              // Reload options
              loadAsync()
            }
          }
          // Watch in `model` or `formState`
          // http://angular-formly.com/#/example/other/filter-select
          $scope.$watch('formState.' + $scope.to.params.foreignEntity, watcher)
          $scope.$watch('model.' + $scope.to.params.foreignEntity, watcher)
        }
      },
    },
  })
}
