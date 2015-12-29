import angular from 'angular'

export default angular.module('app.main.form.formly.type.email', [])
  .run(email)
  .name

function email(formlyConfig) {
  formlyConfig.setType({
    name: 'email',
    extends: 'input',
    defaultOptions: {
      templateOptions: {
        type: 'email',
      },
    },
  })
}
