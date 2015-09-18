export default function(formlyConfigProvider) {
  formlyConfigProvider.setType({
    name: 'select',
    overwriteOk: true,
    template: require('./select.html'),
    wrapper: ['bootstrapLabel', 'bootstrapHasError']
  });
}
