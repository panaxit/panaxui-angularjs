import angular from 'angular';

import DebugService from './debug.service';
import DebugCtrl from './debug.controller';

export default angular.module('app.debug', [
    DebugService
  ])
  .controller('DebugCtrl', DebugCtrl)
  .name;
