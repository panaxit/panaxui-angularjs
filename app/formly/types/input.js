export default function(formlyConfigProvider) {
  formlyConfigProvider.setType({
    name: 'input',
    overwriteOk: true,
    template: require('./input.html'),
    wrapper: ['bootstrapLabel', 'bootstrapHasError']
  });
}
