import angularUpload from 'angular-upload';
import 'angular-upload/src/directives/btnUpload.min.css';

export default angular.module('app.main.form.formly.type.file', [
    'lr.upload'
  ])
  .config(file)
  .name;

function file(formlyConfigProvider) {
  formlyConfigProvider.setType({
    name: 'file',
    extends: 'input',
    template: `
      <div class="form-group">
        <input class=""
               placeholder="{{::to.placeholder}}"
               type="text"
               value="{{model[options.key]}}"
               disabled="disabled">
        <div
          class="btn btn-primary btn-upload"
          upload-button
          url="{{upload_url}}"
          on-success="onSuccess(response)"
          param="file"
          data="formData"
          multiple="false"
          ng-model="model[options.key]"
        >Upload</div>
      </div>
    `,
    defaultOptions: {
      templateOptions: {
        type: 'file'
      }
    },
    controller: function($scope, $rootScope) {
      var catalogName = $rootScope.currentNavBranch.data.catalogName;
      var fieldName = $scope.options.key;
      $scope.upload_url = '/api/upload?catalogName=' + catalogName + '&fieldName=' + fieldName;
      $scope.onSuccess = function(res) {
        // Update model
        var originalname = res.data.data.file.originalname;
        $scope.model[$scope.options.key] = originalname;
        // Use AlertService. Maybe not since it's an external dependency?
      };
    }
  });
}
