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
import Base from '../../views/base';
import Grid from '../../views/grid';
import Form from '../../views/form';
import Cards from '../../views/cards';
import MasterDetail from '../../views/master-detail';

// Panax Directives
import pxGrid from '../../directives/px-grid';
import pxForm from '../../directives/px-form';
import pxCards from '../../directives/px-cards';
import pxAgGrid from '../../directives/px-ag-grid';

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

    // Panax Directives
    pxGrid,
    pxForm,
    pxCards,
    pxAgGrid
	])
	.config(routing)
	.controller('MainCtrl', MainCtrl)
	.name;
