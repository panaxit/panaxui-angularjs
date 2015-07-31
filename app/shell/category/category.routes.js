export default function routes($stateProvider) {
  /*
  Category state
   */
  $stateProvider
    .state('main.category', {
        url: 'category/{name}',
        template: require('./category.html'),
        controller: 'CategoryCtrl',
        controllerAs: 'vm'
    });
}
