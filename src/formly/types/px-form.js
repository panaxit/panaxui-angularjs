export default function(formlyConfigProvider) {
  /*
    px-form (nested)
   */
  formlyConfigProvider.setType({
    name: 'px-form',
    template: require('./px-form.html'),
    wrapper: ['px-panel', 'bootstrapHasError'],
    controller: 'FormlyFormCtrl as vm'
  });
}
