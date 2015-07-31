export default function(formlyConfigProvider) {
  formlyConfigProvider.setType({
    name: 'email',
    extends: 'input',
    defaultOptions: {
      templateOptions: {
        type: 'email'
      }
    }
  });
}
