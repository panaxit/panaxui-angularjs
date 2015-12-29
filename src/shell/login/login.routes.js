export default function routes($stateProvider) {
  /*
  Login state
   */
  $stateProvider
    .state('login', {
      url: '/login',
      template: require('./login.html'),
      controller: 'LoginCtrl',
      controllerAs: 'vm',
    })
}
