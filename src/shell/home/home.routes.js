export default function routes($stateProvider) {
  /*
  Home state
   */
  $stateProvider
    .state('main.home', {
      url: '/',
      template: require('./home.html'),
    })
}
