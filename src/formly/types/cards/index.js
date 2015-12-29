import angular from 'angular'
import FormlyCardsCtrl from './formly.cards.controller'

export default angular.module('app.main.form.formly.type.cards', [])
  .run(cards)
  .controller('FormlyCardsCtrl', FormlyCardsCtrl)
  .name

function cards(formlyConfig) {
  /*
    cards (nested)
   */
  formlyConfig.setType({
    name: 'cards',
    template: require('./template.html'),
    wrapper: ['panel', 'bootstrapHasError'],
    controller: 'FormlyCardsCtrl as vm',
  })
}
