export default function routes($stateProvider) {
  /*
  GridView state
   */
  $stateProvider
    .state('main.panel.grid', {
      url: 'grid/{catalogName}/{mode}?filters&pageSize&pageIndex',
      template: require('./grid.html'),
      controller: 'GridCtrl as vm',
    })
}
