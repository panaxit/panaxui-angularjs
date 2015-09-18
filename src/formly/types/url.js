export default function config(formlyConfigProvider) {
  formlyConfigProvider.setType({
    name: 'url',
    extends: 'input',
    defaultOptions: {
      templateOptions: {
        type: 'url'
      }
    }
  });
}
