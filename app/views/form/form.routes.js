export default function routes($stateProvider) {
  /*
  FormView state
   */
  $stateProvider
    .state('main.panel.form', {
      url: 'form/{catalogName}/{mode}?id',
      template: require('./form.html'),
      controller: 'FormCtrl as vm'
    });
}
