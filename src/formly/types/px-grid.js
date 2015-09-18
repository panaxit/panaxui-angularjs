export default function(formlyConfigProvider) {
  /*
    px-grid (nested)
   */
  formlyConfigProvider.setType({
    name: 'px-grid',
    template: require('./px-grid.html'),
    wrapper: ['px-panel', 'bootstrapHasError'],
    controller: 'FormlyGridCtrl as vm'
  });

}
