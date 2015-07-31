export default function routes($stateProvider) {
  /*
  Panel `parent` state
   */
  $stateProvider
    .state('main.panel', {
        template: require('./panel.html'),
        controller: 'PanelCtrl'
    });
}
