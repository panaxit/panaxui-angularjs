//mport 'bootstrap/dist/css/bootstrap.css';
import 'panaxui-bootstrap/css/bootstrap.min.css'
//import 'panaxui-bootstrap/css/bootstrap-theme.css';
import 'panaxui-bootstrap/css/roboto.css'
import './app.css'

import angular from 'angular'
import 'angular-component/dist/angular-component'
import uibootstrap from 'angular-ui-bootstrap'
import uirouter from 'angular-ui-router'
import azPromiseShow from 'az-promise-show'

// Core Components
import CoreFilters from './core/filters'

// Shell Components
import Login from './shell/login'
import Main from './shell/main'
import Errors from './shell/error'
import Auth from './shell/auth'
import Loading from './shell/loading'
import Session from './shell/session'
import Alert from './shell/alert'

import AppCtrl from './app.controller'

export default angular.module('app', [
  uibootstrap,
  uirouter,
  azPromiseShow,

  CoreFilters,

  Login,
  Main,
  Errors,
  Auth,
  Loading,
  Session,
  Alert,
])
.controller('AppCtrl', AppCtrl)
.name
