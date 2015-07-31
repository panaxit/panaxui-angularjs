export default function (formlyConfigProvider) {
  formlyConfigProvider.setType({
    name: 'default',
    extends: 'input',
    template: require('./default.html')
  });
}
