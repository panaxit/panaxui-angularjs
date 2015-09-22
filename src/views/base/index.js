import angular from 'angular';

import BaseCtrl from './base.controller';

export default angular.module('app.main.base', [])
  .controller('BaseCtrl', BaseCtrl)
  .name;
