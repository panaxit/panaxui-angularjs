import angular from 'angular'

export default angular.module('app.main.form.formly.type.number', [])
  .run(number)
  .name

function number(formlyConfig) {
  formlyConfig.setType({
    name: 'number',
    extends: 'input',
    defaultOptions: {
      templateOptions: {
        type: 'number',
      },
    },
  })
}
