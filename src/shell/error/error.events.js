import angular from 'angular'

export default angular.module('app.error.events', [])
  .constant('ERROR_EVENTS', {
    internalServer: 'error-internal-server',
  })
  .name
