export default angular.module('app.main.form.formly.type.url', [])
  .run(url)
  .name;

function url(formlyConfig) {
  formlyConfig.setType({
    name: 'url',
    extends: 'input',
    defaultOptions: {
      templateOptions: {
        type: 'url'
      }
    }
  });
}
