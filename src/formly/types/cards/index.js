import FormlyCardsCtrl from './formly.cards.controller';

export default angular.module('app.main.form.formly.type.cards', [])
  .config(cards)
  .controller('FormlyCardsCtrl', FormlyCardsCtrl)
  .name;

function cards(formlyConfigProvider) {
  /*
    cards (nested)
   */
  formlyConfigProvider.setType({
    name: 'cards',
    template: require('./template.html'),
    wrapper: ['panel', 'bootstrapHasError'],
    controller: 'FormlyCardsCtrl as vm'
  });
}
