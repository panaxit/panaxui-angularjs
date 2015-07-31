export default function(formlyConfigProvider) {
  formlyConfigProvider.setType({
    name: 'password',
    extends: 'input',
    defaultOptions: {
      templateOptions: {
        type: 'password'
      }
    }
  });
}
