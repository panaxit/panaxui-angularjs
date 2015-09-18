import './login.css';

import angular from 'angular';
import uirouter from 'angular-ui-router';
import md5 from 'angular-md5';

import routing from './login.routes';
import LoginCtrl from './login.controller';

export default angular.module('app.login', [
		uirouter,
		md5
	])
  .config(routing)
	.controller('LoginCtrl', LoginCtrl)
  .name;