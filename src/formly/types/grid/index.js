import FormlyGridCtrl from './formly.grid.controller';

export default angular.module('app.main.form.formly.type.grid', [])
  .config(grid)
  .controller('FormlyGridCtrl', FormlyGridCtrl)
  .name;

function grid(formlyConfigProvider) {
  /*
    grid (nested)
   */
  formlyConfigProvider.setType({
    name: 'grid',
    template: require('./template.html'),
    wrapper: ['panel', 'bootstrapHasError'],
    controller: 'FormlyGridCtrl as vm'
  });

}
