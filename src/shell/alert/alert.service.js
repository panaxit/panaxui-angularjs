import angular from 'angular'

class AlertService {
  constructor($uibModal) {
    var vm = this

    vm.show = function(type, title, body) {
      $uibModal.open({
        template: '<uib-alert class="px-alert" type="{{type}}"><strong>{{title}}</strong>: {{body}}</uib-alert>',
        controller: function($scope) {
          $scope.type = type
          $scope.title = title
          $scope.body = body
        },
        size: 'lg',
      })
    }

  }
}

export default angular.module('app.alert.service', [])
  .service('AlertService', AlertService)
  .name
