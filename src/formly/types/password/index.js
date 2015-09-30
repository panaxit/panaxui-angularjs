export default angular.module('app.main.form.formly.type.password', [])
  .config(password)
  .name;

function password(formlyConfigProvider) {
  formlyConfigProvider.setType({
    name: 'password',
    extends: 'input',
    defaultOptions: {
      templateOptions: {
        type: 'password'
      }
    }
  });
}
