import './main.css';

import angular from 'angular';
import uirouter from 'angular-ui-router';
import ngUrlify from 'angular-urlify';
import ngTreeControl from 'angular-tree-control';
import 'angular-tree-control/css/tree-control.css';

// Shell Components
import MainCRUD from '../../shell/crud';
import MainDebug from '../../shell/debug';
import MainHome from '../../shell/home';
import MainCategory from '../../shell/category';
import MainPanel from '../../shell/panel';

// Panax Directives
import pxGrid from '../../directives/px-grid';
import pxForm from '../../directives/px-form';
import pxCards from '../../directives/px-cards';

// Data Components
import Base from '../../views/grid';
import Grid from '../../views/grid';
import Form from '../../views/form';
import Cards from '../../views/cards';
import MasterDetail from '../../views/master-detail';

import routing from './main.routes';
import MainCtrl from './main.controller';

export default angular.module('app.main', [
		uirouter,
		ngUrlify,
    ngTreeControl,

    MainCRUD,
		MainDebug,
    MainHome,
    MainCategory,
    MainPanel,

    pxGrid,
    pxForm,
    pxCards,

    Base,
    Grid,
    Form,
    Cards,
    MasterDetail
	])
	.config(routing)
	.controller('MainCtrl', MainCtrl)
	.name;
