import angular from 'angular'

export default angular.module('app.main.form.formly.wrapper.panel', [])
  .config(panel)
  .name

function panel(formlyConfigProvider) {
  formlyConfigProvider.setWrapper({
    name: 'panel',
    template: require('./template.html'),
  })
}
