import angular from 'angular'

import 'angular-upload'
import 'angular-upload/src/directives/btnUpload.min.css'

import './style.css'

export default angular.module('app.main.form.formly.type.file', [
  'lr.upload',
])
  .run(file)
  .name

function file(formlyConfig) {
  formlyConfig.setType({
    name: 'file',
    extends: 'input',
    template: `
      <div class="form-group">
        <input class="form-control"
               name="{{::id}}"
               placeholder="{{::to.placeholder}}"
               type="text"
               value="{{model[options.key]}}"
               disabled="disabled">
        <div
          class="btn btn-primary btn-upload"
          upload-button
          url="{{::to.url}}"
          on-success="onSuccess(response)"
          param="file"
          data="formData"
          multiple="false"
          ng-model="model[options.key]"
        >Upload</div>
      </div>
    `,
    controller: function($scope, $rootScope, SessionService) {
      var catalogName = $rootScope.currentNavBranch.data.catalogName
      var fieldName = $scope.options.key
        // Set Upload URL
      $scope.to.url = $scope.to.url || '/api/upload?catalogName=' + catalogName + '&fieldName=' + fieldName

      // Update upload path if model already set
      $scope.to.uploadPath = $scope.to.uploadPath || getUploadPath($scope.model[$scope.options.key])

      function getUploadPath(filename) {
        if (filename) {
          return '/uploads/' + SessionService.panaxInstance + '/' + catalogName + '/' + fieldName + '/' + filename
        }
      }

      // On Success Callback
      $scope.onSuccess = function(res) {
        var originalname = res.data.data.file.originalname
          // Update model
        $scope.model[$scope.options.key] = originalname
          // Set dirty
        $scope.options.formControl.$setDirty()
          // Update uploadPath
        $scope.to.uploadPath = getUploadPath(originalname)
          // Use AlertService. Maybe not since it's an external dependency?
      }
    },
  })
}
