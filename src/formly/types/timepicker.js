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
  timepicker
  https://github.com/formly-js/angular-formly-website/issues/23
  */

  ngModelAttrs = {};

  // attributes
  angular.forEach([
    'meridians',
    'readonly-input',
    'mousewheel',
    'arrowkeys'
  ], function(attr) {
    ngModelAttrs[camelize(attr)] = {attribute: attr};
  });

  // bindings
  angular.forEach([
    'hour-step',
    'minute-step',
    'show-meridian'
  ], function(binding) {
    ngModelAttrs[camelize(binding)] = {bound: binding};
  });

  formlyConfigProvider.setType({
    name: 'time',
    template: require('./timepicker.html'),
    wrapper: ['bootstrapLabel', 'bootstrapHasError'],
    defaultOptions: {
      ngModelAttrs: ngModelAttrs,
      templateOptions: {
      }
    }
  });
}
