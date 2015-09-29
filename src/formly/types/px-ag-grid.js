export default function(formlyConfigProvider) {
  /*
    px-ag-grid (nested)
   */
  formlyConfigProvider.setType({
    name: 'px-ag-grid',
    template: require('./px-ag-grid.html'),
    wrapper: ['px-panel', 'bootstrapHasError'],
    //controller: 'FormlyGridCtrl as vm'
  });

}
