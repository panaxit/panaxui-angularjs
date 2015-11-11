export default angular.module('app.main.form.formly.type.picture', [])
  .config(picture)
  .name;

function picture(formlyConfigProvider) {
  /*
    picture
    ToDo: picture: http://www.w3schools.com/tags/att_input_accept.asp
   */
  formlyConfigProvider.setType({
    name: 'picture',
    extends: 'input',
    defaultOptions: {
      templateOptions: {
        type: 'file'
      }
    }
  });
}
