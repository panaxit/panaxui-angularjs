import './home.css';

import angular from 'angular';
import uirouter from 'angular-ui-router';

import routing from './home.routes';

export default angular.module('app.main.home', [uirouter])
  .config(routing)
  .name;