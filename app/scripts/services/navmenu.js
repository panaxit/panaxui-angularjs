'use strict';

/**
 * @ngdoc service
 * @name panaxuiApp.NavMenu
 * @description
 * # NavMenu
 * Service in the panaxuiApp.
 */
angular.module('panaxuiApp')
	.service('NavMenu', function() {
		// AngularJS will instantiate a singleton by calling "new" on this function
		var NavMenu = this;

		var menu = [{
			label: 'Kitchen Sink',
			children: [{
				label: 'Grids',
				children: [{
					label: 'Grid: Simple',
					data: {
						controlType: 'grid',
						catalogName: 'dbo.Simple',
						mode: 'edit'
					}
				}]
			}, {
				label: 'Forms',
				children: [{
					label: 'Form: Basic Controls',
					data: {
						controlType: 'form',
						catalogName: 'dbo.Simple',
						mode: 'edit'
					}
				}, {
					label: 'Form: Advanced Controls',
					data: {
						controlType: 'form',
						catalogName: 'dbo.Advanced',
						mode: 'edit'
					}
				}]
			}, {
				label: 'Relations',
				children: [{
					label: 'One-to-One: Nested Form',
					data: {
						controlType: 'form',
						catalogName: 'dbo.OneToOne',
						mode: 'edit'
					}
				}, {
					label: 'One-to-Many: Nested Grid',
					data: {
						controlType: 'form',
						catalogName: 'dbo.OneToMany',
						mode: 'edit'
					}
				}, {
					label: 'Cascaded: Comboboxes',
					data: {
						controlType: 'form',
						catalogName: 'dbo.Cascaded',
						mode: 'edit'
					}
				}]
			}]
		}];

		NavMenu.data = [{
			label: 'Home',
			children: menu
		}];

	});