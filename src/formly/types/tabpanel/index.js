import angular from 'angular'

export default angular.module('app.main.form.formly.type.tabpanel', [])
  .run(tabpanel)
  .name

function tabpanel(formlyConfig) {
  /*
    tabpanel
   */
  formlyConfig.setType({
    name: 'tabpanel',
    template: require('./template.html'),
  })
}
