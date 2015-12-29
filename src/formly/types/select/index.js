import angular from 'angular'

export default angular.module('app.main.form.formly.type.select', [])
  .run(select)
  .name

function select(formlyConfig) {
  formlyConfig.setType({
    name: 'select',
    overwriteOk: true,
    template: require('./template.html'),
    wrapper: ['bootstrapLabel', 'bootstrapHasError'],
  })
}
