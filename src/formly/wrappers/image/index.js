import './style.css';

export default angular.module('app.main.form.formly.wrapper.image', [])
  .config(image)
  .name;

function image(formlyConfigProvider) {
  formlyConfigProvider.setWrapper({
    name: 'image',
    template: require('./template.html')
  });
}
