import './form.css';

import angular from 'angular';
import uirouter from 'angular-ui-router';

import routing from './form.routes';
import FormCtrl from './form.controller';
import FormlyFormCtrl from './formly.form.controller';

import formlyTypes from '../../formly';

export default angular.module('app.main.form', [
    uirouter,
    formlyTypes
  ])
  .config(routing)
  .controller('FormCtrl', FormCtrl)
  .controller('FormlyFormCtrl', FormlyFormCtrl)
  .name;
