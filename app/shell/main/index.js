import './main.css';

import angular from 'angular';
import uirouter from 'angular-ui-router';
import ngUrlify from 'angular-urlify';
import ngTreeControl from 'angular-tree-control';
import 'angular-tree-control/css/tree-control.css';

import MainCRUD from '../../shell/crud';
import MainDebug from '../../shell/debug';
import MainHome from '../../shell/home';
import MainCategory from '../../shell/category';
import MainPanel from '../../shell/panel';

import GridView from '../../views/grid';
import pxGrid from '../../directives/px-grid';
import FormView from '../../views/form';
import pxForm from '../../directives/px-form';
import CardsView from '../../views/cards';
import pxCards from '../../directives/px-cards';

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

    GridView,
    pxGrid,
    FormView,
    pxForm,
    CardsView,
    pxCards
	])
	.config(routing)
	.controller('MainCtrl', MainCtrl)
	.name;
