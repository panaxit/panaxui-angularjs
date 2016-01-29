import './main.css'

import angular from 'angular'
import uirouter from 'angular-ui-router'
import ngUrlify from 'angular-urlify'
import ngTreeControl from 'angular-tree-control'
import 'angular-tree-control/css/tree-control.css'

import routing from './main.routes'
import MainCtrl from './main.controller'

// Shell
import CRUD from '../../shell/crud'
import Payload from '../../shell/payload'
import Debug from '../../shell/debug'
import Home from '../../shell/home'
import Category from '../../shell/category'
import Panel from '../../shell/panel'

// Data Views
import Base from '../../shell/base'
import Grid from '../../shell/grid'
import Form from '../../shell/form'
import Cards from '../../shell/cards'
import MasterDetail from '../../shell/master-detail'
import Template from '../../shell/template'

// Panax Components
import pxGrid from '../../components/px-grid'
import pxCards from '../../components/px-cards'
import pxForm from '../../components/px-form'
import pxAgGrid from '../../components/px-ag-grid'
import pxTemplate from '../../components/px-template'
import pxKendoGrid from '../../components/px-kendo-grid'

export default angular.module('app.main', [
  uirouter,
  ngUrlify,
  ngTreeControl,

  // Shell
  CRUD,
  Payload,
  Debug,
  Home,
  Category,
  Panel,

  // Data Views
  Base,
  Grid,
  Form,
  Cards,
  MasterDetail,
  Template,

  // Panax Components
  pxGrid,
  pxForm,
  pxCards,
  pxAgGrid,
  pxTemplate,
  pxKendoGrid,
])
  .config(routing)
  .controller('MainCtrl', MainCtrl)
  .name
