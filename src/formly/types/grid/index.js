import FormlyGridCtrl from './formly.grid.controller';

export default angular.module('app.main.form.formly.type.grid', [])
  .run(grid)
  .controller('FormlyGridCtrl', FormlyGridCtrl)
  .name;

function grid(formlyConfig) {
  /*
    grid (nested)
   */
  formlyConfig.setType({
    name: 'grid',
    template: require('./template.html'),
    wrapper: ['panel', 'bootstrapHasError'],
    controller: 'FormlyGridCtrl as vm'
  });

}
