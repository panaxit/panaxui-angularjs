import angular from 'angular';

class PayloadService {
  constructor() {
  }

  /**
   * Create data table payload to be sent
   * Used by: Form
   */
  build(fields, model, catalog) {
    if(!catalog) return {};

    var vm = this;

    var payload = {
      tableName: catalog.catalogName,
      primaryKey: catalog.primaryKey,
      identityKey: catalog.identityKey,
      foreignReference: catalog.foreignReference
    };

    if(catalog.mode === 'insert') {
      payload.insertRows = [];
      model.forEach((record, index) => {
        var row = {};
        vm.dirtyFieldsIterator(fields[index], row, record);
        payload.insertRows.push(row);
      });
    } else if(catalog.mode === 'edit') {
      payload.updateRows = [];
      model.forEach((record, index) => {
        var row = {};
        vm.dirtyFieldsIterator(fields[index], row, record);
        // Set primaryKey and/or identityKey as DataRow with current value
        if(!!payload.primaryKey) {
          row[payload.primaryKey] = record[payload.primaryKey];
        }
        if(!!payload.identityKey) {
          row[payload.identityKey] = record[payload.identityKey];
        }
        payload.updateRows.push(row);
      });
    } else if(catalog.mode === 'filters') {
      payload.dataRows = [];
      model.forEach((record, index) => {
        var row = {};
        vm.dirtyFieldsIterator(fields[index], row, record);
        payload.dataRows.push(row);
      });
    }

    return payload;
  }

  dirtyFieldsIterator(fields, payload, orig_model) {
    var vm = this;

    angular.forEach(fields, function (el) {
      if(el.fields) {
        /*
        fieldset / tab
         */
        vm.dirtyFieldsIterator(el.fields, payload, orig_model);
        return;
      } else if(el.tabs) {
        /*
        tabs
         */
        vm.dirtyFieldsIterator(el.tabs, payload, orig_model);
        return;
      } else if(el.fieldGroup) {
        /*
        fieldGroup (async_select, ...)
         */
        vm.dirtyFieldsIterator(el.fieldGroup, payload, orig_model);
        return;
      } else if(el.data && el.data.fields) {
        /*
        nested
         */
        payload[el.key] = vm.build([el.data.fields], [orig_model[el.key]], el.data.catalog);
        return;
      }

      // Copy field's value
      if(orig_model.hasOwnProperty(el.key) && (el.formControl && el.formControl.$dirty)) {
        payload[el.key] = el.formControl.$viewValue || el.formControl.$modelValue;
      }
    });
  }
}

PayloadService.$inject = [];

export default angular.module('app.payload.service', [])
  .service('PayloadService', PayloadService)
  .name;
