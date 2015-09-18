export default function (formlyConfigProvider) {
  /*
    panel wrapper
   */
  formlyConfigProvider.setWrapper({
    name: 'px-panel',
    template: require('./px-panel.html')
  });
}
