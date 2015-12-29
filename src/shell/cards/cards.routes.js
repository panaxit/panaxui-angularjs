export default function routes($stateProvider) {
  /*
  CardsView state
   */
  $stateProvider
    .state('main.panel.cards', {
      url: 'cards/{catalogName}/{mode}?filters&pageSize&pageIndex',
      template: require('./cards.html'),
      controller: 'CardsCtrl as vm',
    })
}
