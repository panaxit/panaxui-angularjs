import angularUpload from 'angular-upload';
import 'angular-upload/src/directives/btnUpload.min.css';

import './style.css';

export default angular.module('app.main.form.formly.type.picture', [
    'lr.upload'
  ])
  .run(picture)
  .name;

function picture(formlyConfig) {
  formlyConfig.setType({
    name: 'picture',
    extends: 'file',
    wrapper: ['image']
  });
}
