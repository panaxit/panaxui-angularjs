import angular from 'angular'

export default angular.module('app.main.form.formly.type.default', [])
  .run(_default)
  .name

function _default(formlyConfig) {
  formlyConfig.setType({
    name: 'default',
    overwriteOk: true,
    extends: 'input',
    template: require('./template.html'),
  })
}
