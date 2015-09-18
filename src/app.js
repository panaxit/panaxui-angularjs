//mport 'bootstrap/dist/css/bootstrap.css';
import 'panaxui-bootstrap/css/bootstrap.min.css';
//import 'panaxui-bootstrap/css/bootstrap-theme.css';
import 'panaxui-bootstrap/css/roboto.css';
import './app.css';

import angular from 'angular';
import uibootstrap from 'angular-ui-bootstrap';
import uirouter from 'angular-ui-router';
import azPromiseShow from  'az-promise-show';

import CoreFilters from './core/filters';

import ShellLogin from './shell/login';
import ShellMain from './shell/main';
import ShellError from './shell/error';
import ShellAuth from './shell/auth';
import ShellLoading from './shell/loading';
import ShellSession from './shell/session';
import ShellAlert from './shell/alert';

import routing from './app.routes';
import AppCtrl from './app.controller';

export default angular.module('app', [
		uibootstrap,
		uirouter,
    azPromiseShow,

    CoreFilters,

		ShellLogin,
		ShellMain,
		ShellError,
		ShellAuth,
		ShellLoading,
		ShellSession,
		ShellAlert
	])
	.config(routing)
  .controller('AppCtrl', AppCtrl)
	.name;
