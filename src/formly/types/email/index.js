export default angular.module('app.main.form.formly.type.email', [])
  .config(email)
  .name;

function email(formlyConfigProvider) {
  formlyConfigProvider.setType({
    name: 'email',
    extends: 'input',
    defaultOptions: {
      templateOptions: {
        type: 'email'
      }
    }
  });
}
