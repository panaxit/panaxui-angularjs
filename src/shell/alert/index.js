import angular from 'angular';

import AlertService from './alert.service';

export default angular.module('app.alert', [
		AlertService
	])
	.name;