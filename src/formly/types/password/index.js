import angular from 'angular'

export default angular.module('app.main.form.formly.type.password', [])
  .run(password)
  .name

function password(formlyConfig) {
  formlyConfig.setType({
    name: 'password',
    extends: 'input',
    defaultOptions: {
      templateOptions: {
        type: 'password',
      },
    },
  })
}
