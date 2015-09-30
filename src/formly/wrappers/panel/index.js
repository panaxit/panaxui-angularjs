export default angular.module('app.main.form.formly.wrapper.panel', [
  ])
  .config(panel)
  .name;

function panel(formlyConfigProvider) {
  /*
    panel wrapper
   */
  formlyConfigProvider.setWrapper({
    name: 'panel',
    template: require('./template.html')
  });
}
