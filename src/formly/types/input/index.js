import angular from 'angular'

export default angular.module('app.main.form.formly.type.input', [])
  .run(input)
  .name

function input(formlyConfig) {
  formlyConfig.setType({
    name: 'input',
    overwriteOk: true,
    template: require('./template.html'),
    wrapper: ['bootstrapLabel', 'bootstrapHasError'],
  })
}
