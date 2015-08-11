export default function routes($stateProvider) {
  /*
  FormView state
   */
  $stateProvider
    .state('main.panel.form', {
      url: 'form/{catalogName}/{mode}?id&filters&pageSize&pageIndex',
      template: require('./form.html'),
      controller: 'FormCtrl as vm'
    });
}
