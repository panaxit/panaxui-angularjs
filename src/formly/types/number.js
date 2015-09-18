export default function(formlyConfigProvider) {
  formlyConfigProvider.setType({
    name: 'number',
    extends: 'input',
    defaultOptions: {
      templateOptions: {
        type: 'number'
      }
    }
  });
}
