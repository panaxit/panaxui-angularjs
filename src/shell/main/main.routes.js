export default function routes($stateProvider) {
  /*
	Main `abstract` root state
	 */
  $stateProvider
    .state('main', {
      abstract: true,
      template: require('./main.html'),
      controller: 'MainCtrl',
      controllerAs: 'vm',
      data: {
        authRequired: true,
      },
    })
}
