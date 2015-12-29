import angular from 'angular'
import './cards.css'

import uirouter from 'angular-ui-router'

import routing from './cards.routes'
import CardsCtrl from './cards.controller'

export default angular.module('app.main.cards', [
  uirouter,
])
  .config(routing)
  .controller('CardsCtrl', CardsCtrl)
  .name
