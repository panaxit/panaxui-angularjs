# ToDo PanaxUI GUI - AngularJS

# Testing

- UNIT-TESTs: ALL PENDING !!!

# Navigation

- Breadcrumb should work well with Nav tree
	- Should select navTree node and vice-verza
		- select_branch() should be in an routeChanged event?
		- ui-sref-active
			- https://github.com/angular-ui/ui-router/wiki/Quick-Reference#ui-sref-active
		- https://github.com/ncuillery/angular-breadcrumb/wiki/API-Reference#state-options
			- parent
			- url params
	- Multi-level states resembling nav-tree?

- Routes should work for links (ex. http://localhost:3000/gui/ng/#/category/kitchen-sink)

- Pretty urls (sans #)
	- Scotch.io article? search it!

# UI

- Refactor Debug Modal as done with AlertService, for controllers that use it (ex. category, panel>form, panel>grid, ... etc)
- Validation error messages directive: https://teamgaslight.com/blog/how-to-create-a-configurable-angularjs-directive

# AUTH

* SHOW MODAL form auth messages
	- Alternative: Global Message (bootstrap-)alert at the (first template-)bottom
		- Use ui.router named ui-view's ?

- Login form + password managers issue
	- https://medium.com/opinionated-angularjs/techniques-for-authentication-in-angularjs-applications-7bbf0346acec?source=tw-b8af63a425f1-1424737797183

# UI SHELL

- Responsive Siderbar
	- https://github.com/asyraf9/bootstrap-sidebar