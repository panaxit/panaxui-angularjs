import './cards.css';

import angular from 'angular';
import uirouter from 'angular-ui-router';

import routing from './cards.routes';
import CardsCtrl from './cards.controller';
import FormlyCardsCtrl from './formly.cards.controller';

export default angular.module('app.main.cards', [
    uirouter
  ])
  .config(routing)
  .controller('CardsCtrl', CardsCtrl)
  .controller('FormlyCardsCtrl', FormlyCardsCtrl)
  .name;
