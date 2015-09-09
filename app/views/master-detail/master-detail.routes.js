export default function routes($stateProvider) {
  /*
  MasterDetail state
   */
  $stateProvider
    .state('main.panel.master-detail', {
      url: 'master-detail/{catalogName}/{mode}?filters&pageSize&pageIndex',
      template: require('./master-detail.html'),
      controller: 'MasterDetailCtrl as vm'
    });
}
