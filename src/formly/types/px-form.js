export default function(formlyConfigProvider) {
  /*
    px-form (nested)
   */
  formlyConfigProvider.setType({
    name: 'px-form',
    template: require('./px-form.html'),
    wrapper: ['panel', 'bootstrapHasError'],
    controller: 'FormlyFormCtrl as vm'
  });
}
