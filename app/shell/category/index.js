import './category.css';

import angular from 'angular';
import uirouter from 'angular-ui-router';

import routing from './category.routes';
import CategoryCtrl from './category.controller';

export default angular.module('app.main.category', [
    uirouter
  ])
  .config(routing)
  .controller('CategoryCtrl', CategoryCtrl)
  .name;
