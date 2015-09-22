import angular from 'angular';

import PayloadService from './payload.service';

export default angular.module('app.payload', [
    PayloadService
  ])
  .name;