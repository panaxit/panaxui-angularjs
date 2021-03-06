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

import angular from 'angular'
import formly from 'angular-formly'

// Wrappers
import panel from './wrappers/panel'
import image from './wrappers/image'

// Types
import tabpanel from './types/tabpanel'
import input from './types/input'
import _default from './types/default'
import checkbox from './types/checkbox'
import password from './types/password'
import email from './types/email'
import file from './types/file'
import picture from './types/picture'
import url from './types/url'
import number from './types/number'
import money from './types/money'
import select from './types/select'
import asyncSelect from './types/asyncSelect'
import color from './types/color'
import date from './types/date'
import time from './types/time'
import datetime from './types/datetime'

// Nested types
import form from './types/form'
import cards from './types/cards'
import grid from './types/grid'
import junction from './types/junction'
import template from './types/template'

export default angular.module('app.main.form.formly', [
  formly,

  panel,
  image,

  tabpanel,
  input,
  _default,
  checkbox,
  password,
  email,
  file,
  picture,
  url,
  number,
  money,
  select,
  asyncSelect,
  color,
  date,
  time,
  datetime,

  form,
  cards,
  grid,
  junction,
  template,
])
  .name
