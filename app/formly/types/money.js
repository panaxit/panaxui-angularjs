export default function config(formlyConfigProvider) {
  formlyConfigProvider.setType({
    name: 'money',
    extends: 'number',
    template: require('./money.html')
  });
}
