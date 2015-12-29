import angular from 'angular'

import DebugService from './debug.service'
import DebugCtrl from './debug.controller'

import 'jsonformatter'
import 'jsonformatter/dist/json-formatter.css'

export default angular.module('app.debug', [
  DebugService,
  'jsonFormatter',
])
  .controller('DebugCtrl', DebugCtrl)
  .name
