import './grid.css';

import angular from 'angular';
import uirouter from 'angular-ui-router';

import routing from './grid.routes';
import GridCtrl from './grid.controller';

export default angular.module('app.main.grid', [
    uirouter
  ])
  .config(routing)
  .controller('GridCtrl', GridCtrl)
  .name;
