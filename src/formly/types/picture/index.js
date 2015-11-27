import angularUpload from 'angular-upload';
import 'angular-upload/src/directives/btnUpload.min.css';

import './style.css';

export default angular.module('app.main.form.formly.type.picture', [
    'lr.upload'
  ])
  .config(picture)
  .name;

function picture(formlyConfigProvider) {
  formlyConfigProvider.setType({
    name: 'picture',
    extends: 'input',
    template: `
      <div class="form-group">
        <img class="px-upload-picture-img img-rounded"
             ng-src="{{uploadPath || '/images/noimg.png'}}" />
        <input class="form-control"
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
    },
    controller: function($scope, $rootScope, SessionService) {
      // Set Upload URL
      var catalogName = $rootScope.currentNavBranch.data.catalogName;
      var fieldName = $scope.options.key;
      $scope.upload_url = '/api/upload?catalogName=' + catalogName + '&fieldName=' + fieldName;

      // Update upload path if model already set
      updateUploadPath($scope.model[$scope.options.key]);

      function updateUploadPath(filename) {
        if(filename) {
          $scope.uploadPath = '/uploads/' + SessionService.panax_instance
                              + '/' + catalogName
                              + '/' + fieldName
                              + '/' + filename;
        }
      }

      // On Success Callback
      $scope.onSuccess = function(res) {
        // Update model
        var originalname = res.data.data.file.originalname;
        $scope.model[$scope.options.key] = originalname;
        // Update uploadPath
        updateUploadPath(res.data.data.file.originalname);
        // Use AlertService? Maybe not since it's an external dependency?
      };
    }
  });
}
