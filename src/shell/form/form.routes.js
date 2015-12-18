export default function routes($stateProvider) {
  /*
  FormView state
   */

  var queryParams = [
    'identityKey',
    'primaryKey',
    'id',
    'filters',
    'pageSize',
    'pageIndex',
    // Referrer Entity
    'ref',
    'refId'
  ].join('&');

  $stateProvider
    .state('main.panel.form', {
      url: 'form/{catalogName}/{mode}?' + queryParams,
      template: require('./form.html'),
      controller: 'FormCtrl as vm'
    });
}
