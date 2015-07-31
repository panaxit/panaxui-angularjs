export default function(formlyConfigProvider) {
  /*
  ngModelAttrs stuff
   */
  var ngModelAttrs = {};

  function camelize(string) {
    string = string.replace(/[\-_\s]+(.)?/g, function(match, chr) {
      return chr ? chr.toUpperCase() : '';
    });
    // Ensure 1st char is always lowercase
    return string.replace(/^([A-Z])/, function(match, chr) {
      return chr ? chr.toLowerCase() : '';
    });
  }

  /*
  colorpicker
  */

  ngModelAttrs = {};

  // attributes
  angular.forEach([
    'color-picker-format',
    'color-picker-alpha',
    'color-picker-swatch',
    'color-picker-swatch-pos',
    'color-picker-swatch-bootstrap',
    'color-picker-swatch-only',
    'color-picker-pos',
    'color-picker-case'
  ], function(attr) {
    ngModelAttrs[camelize(attr)] = {attribute: attr};
  });

  // bindings
  angular.forEach([
  ], function(binding) {
    ngModelAttrs[camelize(binding)] = {bound: binding};
  });

  formlyConfigProvider.setType({
    name: 'color',
    template: '<color-picker ng-model="model[options.key]" color-picker-swatch-bootstrap="false"></color-picker>',
    wrapper: ['bootstrapLabel', 'bootstrapHasError'],
    defaultOptions: {
      ngModelAttrs: ngModelAttrs,
      templateOptions: {
        "colorPickerFormat": "'hex'",
        "colorPickerAlpha": false,
        "colorPickerPos": "'top left'",
        "colorPickerSwatchOnly": false,
        "colorPickerSwatchBootstrap": false,
        "colorPickerSwatchPos": "'left'"
      }
    }
  });
}
