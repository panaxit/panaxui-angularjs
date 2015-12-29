import angular from 'angular'

import './panel.css'

import uirouter from 'angular-ui-router'

import routing from './panel.routes'
import PanelCtrl from './panel.controller'

export default angular.module('app.main.panel', [
  uirouter,
])
  .config(routing)
  .controller('PanelCtrl', PanelCtrl)
  .name
