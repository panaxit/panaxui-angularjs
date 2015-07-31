import angular from 'angular';

export default angular.module('app.loading.events', [])
  .constant('LOADING_EVENTS', {
    loadingStart: 'loading-start',
    loadingEnd: 'loading-end'
  })
  .name;