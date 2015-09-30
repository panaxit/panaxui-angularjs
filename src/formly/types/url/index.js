export default angular.module('app.main.form.formly.type.url', [])
  .config(url)
  .name;

function url(formlyConfigProvider) {
  formlyConfigProvider.setType({
    name: 'url',
    extends: 'input',
    defaultOptions: {
      templateOptions: {
        type: 'url'
      }
    }
  });
}
