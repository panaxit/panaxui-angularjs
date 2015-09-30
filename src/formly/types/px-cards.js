export default function(formlyConfigProvider) {
  /*
    px-cards (nested)
   */
  formlyConfigProvider.setType({
    name: 'px-cards',
    template: require('./px-cards.html'),
    wrapper: ['panel', 'bootstrapHasError'],
    controller: 'FormlyCardsCtrl as vm'
  });
}
