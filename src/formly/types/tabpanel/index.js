export default angular.module('app.main.form.formly.type.tabpanel', [])
  .config(tabpanel)
  .name

function tabpanel(formlyConfigProvider) {
  /*
    tabpanel
   */
  formlyConfigProvider.setType({
    name: 'tabpanel',
    template: require('./template.html')
  });
}
