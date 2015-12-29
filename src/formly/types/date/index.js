import angular from 'angular'

export default angular.module('app.main.form.formly.type.date', [])
  .run(date)
  .name

function date(formlyConfig) {
  /*
  ngModelAttrs stuff
   */
  var ngModelAttrs = {}

  function camelize(string) {
    string = string.replace(/[\-_\s]+(.)?/g, function(match, chr) {
      return chr ? chr.toUpperCase() : ''
    })
      // Ensure 1st char is always lowercase
    return string.replace(/^([A-Z])/, function(match, chr) {
      return chr ? chr.toLowerCase() : ''
    })
  }

  /*
  datepicker
  (https://github.com/formly-js/angular-formly-website/issues/15#issuecomment-103467421)
   */

  ngModelAttrs = {}

  // Attributes
  angular.forEach([
    'date-disabled',
    'custom-class',
    'show-weeks',
    'starting-day',
    'init-date',
    'min-mode',
    'max-mode',
    'format-day',
    'format-month',
    'format-year',
    'format-day-header',
    'format-day-title',
    'format-month-title',
    'year-range',
    'shortcut-propagation',
    'datepicker-popup',
    'show-button-bar',
    'current-text',
    'clear-text',
    'close-text',
    'close-on-date-selection',
    'datepicker-append-to-body',
  ], function(attr) {
    ngModelAttrs[camelize(attr)] = {
      attribute: attr,
    }
  })

  // Bindings
  angular.forEach([
    'datepicker-mode',
    'min-date',
    'max-date',
  ], function(binding) {
    ngModelAttrs[camelize(binding)] = {
      bound: binding,
    }
  })

  formlyConfig.setType({
    name: 'date',
    template: require('./template.html'),
    wrapper: ['bootstrapLabel', 'bootstrapHasError'],
    defaultOptions: {
      ngModelAttrs: ngModelAttrs,
      templateOptions: {
        type: 'text',
        datepickerPopup: 'dd-MMMM-yyyy',
        addonLeft: {
          class: 'glyphicon glyphicon-calendar',
          onClick: function(options) {
            options.templateOptions.isOpen = !options.templateOptions.isOpen
          },
        },
        onFocus: function($viewValue, $modelValue, scope) {
          scope.to.isOpen = !scope.to.isOpen
        },
        datepickerOptions: {},
      },
    },
  })
}
