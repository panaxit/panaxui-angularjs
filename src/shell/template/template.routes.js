export default function routes($stateProvider) {
  /*
  TemplateView state
   */
  $stateProvider
    .state('main.panel.template', {
      url: 'template/{catalogName}/{mode}?filters&pageSize&pageIndex',
      template: require('./template.html'),
      controller: 'TemplateCtrl as vm',
    })
}
