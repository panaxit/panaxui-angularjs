import angular from 'angular'

// http://webpack.github.io/docs/shimming-modules.html#imports-loader
import 'imports?tinycolor=tinycolor2!angularjs-color-picker/angularjs-color-picker.js'
import 'angularjs-color-picker/angularjs-color-picker.css'

export default angular.module('app.main.form.formly.type.color', [
  'color.picker',
])
  .run(color)
  .name

function color(formlyConfig) {
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
  colorpicker
  */

  ngModelAttrs = {}

  // attributes
  angular.forEach([
    'color-picker-format',
    'color-picker-alpha',
    'color-picker-swatch',
    'color-picker-swatch-pos',
    'color-picker-swatch-bootstrap',
    'color-picker-swatch-only',
    'color-picker-pos',
    'color-picker-case',
  ], function(attr) {
    ngModelAttrs[camelize(attr)] = {
      attribute: attr,
    }
  })

  // bindings
  angular.forEach([], function(binding) {
    ngModelAttrs[camelize(binding)] = {
      bound: binding,
    }
  })

  formlyConfig.setType({
    name: 'color',
    template: '<color-picker ng-model="model[options.key]" color-picker-swatch-bootstrap="false"></color-picker>',
    wrapper: ['bootstrapLabel', 'bootstrapHasError'],
    defaultOptions: {
      ngModelAttrs: ngModelAttrs,
      templateOptions: {
        colorPickerFormat: "'hex'",
        colorPickerAlpha: false,
        colorPickerPos: "'top left'",
        colorPickerSwatchOnly: false,
        colorPickerSwatchBootstrap: false,
        colorPickerSwatchPos: "'left'",
      },
    },
  })
}
