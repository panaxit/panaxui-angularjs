import './master-detail.css';

import angular from 'angular';
import uirouter from 'angular-ui-router';

import routing from './master-detail.routes';
import MasterDetailCtrl from './master-detail.controller';

export default angular.module('app.main.master-detail', [
    uirouter
  ])
  .config(routing)
  .controller('MasterDetailCtrl', MasterDetailCtrl)
  .name;
