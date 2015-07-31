export default function(formlyConfigProvider) {
  /*
    px-form (nested)
   */
  formlyConfigProvider.setType({
    name: 'px-form',
    //templateUrl: 'views/form.html',
    template: require('./px-form.html'),
    wrapper: ['px-panel', 'bootstrapHasError'],
    controller: 'FormlyFormCtrl as vm'
  });
}
