import angular from 'angular';

import BaseCtrl from './base.controller';

export default angular.module('app.main.cards', [])
  .controller('BaseCtrl', BaseCtrl)
  .name;
