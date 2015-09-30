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

import pxForm from './types/px-form';
import pxGrid from './types/px-grid';
import pxCards from './types/px-cards';
import junction_table from './types/junction_table';


import panel from './wrappers/panel';
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
import color from './types/color';
import date from './types/date';
import time from './types/time';
import datetime from './types/datetime';

export default angular.module('app.main.form.formly', [
    formly,

    ngSanitize,
    'ui.select',

    'color.picker',


    panel,
    input,
    _default,
    password,
    email,
    file,
    url,
    number,
    money,
    select,
    async_select,
    color,
    date,
    time,
    datetime
  ])
  .config(pxForm)
  .config(pxGrid)
  .config(pxCards)
  .config(junction_table)
  .name;
