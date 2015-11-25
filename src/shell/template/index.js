import './template.css';

import angular from 'angular';
import uirouter from 'angular-ui-router';

import routing from './template.routes';
import TemplateCtrl from './template.controller';

export default angular.module('app.main.template', [
    uirouter
  ])
  .config(routing)
  .controller('TemplateCtrl', TemplateCtrl)
  .name;
