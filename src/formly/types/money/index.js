export default angular.module('app.main.form.formly.type.money', [])
  .config(money)
  .name;

function money(formlyConfigProvider) {
  formlyConfigProvider.setType({
    name: 'money',
    extends: 'number',
    template: require('./template.html')
  });
}
