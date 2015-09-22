/**
 * HTML5 Input Types
 * http://www.w3schools.com/htmL/html_form_input_types.asp
 *    color
 *    date
 *    datetime
 *    datetime-local
 *    email
 *    month
 *    number
 *    range
 *    search
 *    tel
 *    time
 *    url
 *    week
 *
 * http://www.w3schools.com/tags/att_input_type.asp
 *    file
 *    ...
 */

/**
 * Date/Time controls
 * ToDo: Use AngularUI alternatives? (some HTML5 input types not tupported by IE)
 *  - http://angular-ui.github.io/bootstrap/#/datepicker
 *  - angular-ui.github.io/bootstrap/#/timepicker
 */

import formly from 'angular-formly';

import ngSanitize from 'angular-sanitize';
import uiselect from 'ui-select';
import 'ui-select/dist/select.css';

// http://webpack.github.io/docs/shimming-modules.html#imports-loader
import colorpicker from 'imports?tinycolor=tinycolor2!angular-color-picker/angularjs-color-picker.js';
import 'angular-color-picker/angularjs-color-picker.css';


import input from './types/input';
import _default from './types/default';
import password from './types/password';
import email from './types/email';
import file from './types/file';
import url from './types/url';
import number from './types/number';
import money from './types/money';
import select from './types/select';
import async_select from './types/async_select';
import color from './types/colorpicker';
import date from './types/datepicker';
import time from './types/timepicker';
import datetime from './types/datetime';

import pxPanel from './wrappers/px-panel';
import pxForm from './types/px-form';
import pxGrid from './types/px-grid';
import pxCards from './types/px-cards';

export default angular.module('app.main.form.formly', [
    formly,

    ngSanitize,
    'ui.select',

    'color.picker'
  ])
  .config(input)
  .config(_default)
  .config(password)
  .config(email)
  .config(file)
  .config(url)
  .config(number)
  .config(money)
  .config(select)
  .config(async_select)
  .config(color)
  .config(date)
  .config(time)
  .config(datetime)
  .config(pxPanel)
  .config(pxForm)
  .config(pxGrid)
  .config(pxCards)
  .name;