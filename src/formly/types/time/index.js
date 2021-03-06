import angular from 'angular'

export default angular.module('app.main.form.formly.type.time', [])
  .run(time)
  .name

function time(formlyConfig) {
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
  timepicker
  https://github.com/formly-js/angular-formly-website/issues/23
  */

  ngModelAttrs = {}

  // attributes
  angular.forEach([
    'meridians',
    'readonly-input',
    'mousewheel',
    'arrowkeys',
  ], function(attr) {
    ngModelAttrs[camelize(attr)] = {
      attribute: attr,
    }
  })

  // bindings
  angular.forEach([
    'hour-step',
    'minute-step',
    'show-meridian',
  ], function(binding) {
    ngModelAttrs[camelize(binding)] = {
      bound: binding,
    }
  })

  formlyConfig.setType({
    name: 'time',
    template: require('./template.html'),
    wrapper: ['bootstrapLabel', 'bootstrapHasError'],
    defaultOptions: {
      ngModelAttrs: ngModelAttrs,
      templateOptions: {},
    },
  })
}
