import ngSanitize from 'angular-sanitize';
import uiselect from 'ui-select';
import 'ui-select/dist/select.css';

export default angular.module('app.main.form.formly.type.async_select', [
    ngSanitize,
    'ui.select'
  ])
  .config(async_select)
  .name;

function async_select(formlyConfigProvider) {
  /*
    async_select
    Extends select
    use ui-select (https://github.com/angular-ui/ui-select)
   */
  formlyConfigProvider.setType({
    name: 'async_select',
    extends: 'select',
    template: require('./template.html'),
    defaultOptions: {
      templateOptions: {
        options: [],
        valueProp: 'value',
        labelProp: 'label',
      },
      controller: function($scope, CRUDService) {
        // Async loading
        var loadAsync = function () {
          $scope.to.loading = CRUDService.options($scope.to.params).then(function(res) {
            // Load options
            $scope.to.options = res;
            // Set foreign entity values (cascaded)
            // http://angular-formly.com/#/example/other/filter-select
            if($scope.to.params.foreignEntity) {
              if($scope.model.hasOwnProperty($scope.to.params.foreignEntity)) {
                $scope.model[$scope.to.params.foreignEntity] = $scope.to.params.foreignValue;
              } else if($scope.formState.hasOwnProperty($scope.to.params.foreignEntity)) {
                $scope.formState[$scope.to.params.foreignEntity] = $scope.to.params.foreignValue;
              }
            }
            return res;
          });
        };
        loadAsync();
        // ToDo alternative: Async alternative: Use ui-select's `refresh` functionality
        // https://github.com/angular-ui/ui-select/wiki/ui-select-choices

        // Watcher foreign entity (cascade)
        if($scope.to.params.foreignEntity) {
          var watcher = function (newValue, oldValue, theScope) {
            if(newValue !== oldValue) {
              //console.log($scope.options.key+': foreignEntity `' +$scope.to.params.foreignEntity+'` changed from: '+oldValue+' to: '+newValue)
              // Set own value
              $scope.to.params.foreignValue = newValue;
              // Set own value to empty in `model` or `formState`
              // Avoid when first-time (!oldValue)
              if($scope.model[$scope.options.key] && oldValue) {
                $scope.model[$scope.options.key] = '';
              } else if($scope.formState[$scope.options.key] && oldValue) {
                $scope.formState[$scope.options.key] = '';
              }
              // Reload options
              loadAsync();
            }
          };
          // Watch in `model` or `formState`
          // http://angular-formly.com/#/example/other/filter-select
          $scope.$watch('formState.' + $scope.to.params.foreignEntity, watcher);
          $scope.$watch('model.' + $scope.to.params.foreignEntity, watcher);
        }
      }
    }
  });
}
