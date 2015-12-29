import angular from 'angular'

export default angular.module('app.main.form.formly.type.money', [])
  .run(money)
  .name

function money(formlyConfig) {
  formlyConfig.setType({
    name: 'money',
    extends: 'number',
    template: require('./template.html'),
  })
}
