import './main.css';

import angular from 'angular';
import uirouter from 'angular-ui-router';
import ngUrlify from 'angular-urlify';
import ngTreeControl from 'angular-tree-control';
import 'angular-tree-control/css/tree-control.css';

// Shell Components
import CRUD from '../../shell/crud';
import Payload from '../../shell/payload';
import Debug from '../../shell/debug';
import Home from '../../shell/home';
import Category from '../../shell/category';
import Panel from '../../shell/panel';

// Data Views
import Base from '../../shell/base';
import Grid from '../../shell/grid';
import Form from '../../shell/form';
import Cards from '../../shell/cards';
import MasterDetail from '../../shell/master-detail';
import Template from '../../shell/template';

// Panax Directives
import pxGrid from '../../directives/px-grid';
import pxForm from '../../directives/px-form';
import pxCards from '../../directives/px-cards';
import pxAgGrid from '../../directives/px-ag-grid';
import pxTemplate from '../../directives/px-template';

import routing from './main.routes';
import MainCtrl from './main.controller';

export default angular.module('app.main', [
		uirouter,
		ngUrlify,
    ngTreeControl,

    // Shell Components
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

    // Panax Directives
    pxGrid,
    pxForm,
    pxCards,
    pxAgGrid,
    pxTemplate
	])
	.config(routing)
	.controller('MainCtrl', MainCtrl)
	.name;
