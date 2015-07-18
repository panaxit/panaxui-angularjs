'use strict';

angular.module('panaxuiApp')
  .config(function config(formlyConfigProvider) {
    /*
      file
      ToDo: Improve
        - https://github.com/danialfarid/ng-file-upload
        - https://github.com/nervgh/angular-file-upload
        - https://github.com/flowjs/ng-flow
      ToDo: picture: http://www.w3schools.com/tags/att_input_accept.asp
     */
    formlyConfigProvider.setType({
      name: 'file',
      extends: 'input',
      defaultOptions: {
        templateOptions: {
          type: 'file'
        }
      }
    });

  });