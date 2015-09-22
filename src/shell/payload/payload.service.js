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
      identityKey: catalog.identityKey
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

  dirtyFieldsIterator(fields, dirty_model, orig_model) {
    var vm = this;

    angular.forEach(fields, function (el) {
      // fieldset / tab
      if(el.fields) {
        vm.dirtyFieldsIterator(el.fields, dirty_model, orig_model);
        return;
      }
      // tabs
      if(el.tabs) {
        vm.dirtyFieldsIterator(el.tabs, dirty_model, orig_model);
        return;
      }
      // Nested Form
      if(el.data && el.data.fields) {
        dirty_model[el.key] = {
          tableName: el.data.catalog.catalogName,
          primaryKey: el.data.catalog.primaryKey,
          identityKey: el.data.catalog.identityKey,
          foreignReference: el.data.catalog.foreignReference
        };
        var rowsType;
        if(el.data.catalog.mode === 'insert') rowsType = 'insertRows';
        if(el.data.catalog.mode === 'edit') rowsType = 'updateRows';
        if(el.data.catalog.mode === 'filters') rowsType = 'dataRows';
        if(angular.isObject(orig_model[el.key])) {
          dirty_model[el.key][rowsType] = [{}];
          vm.dirtyFieldsIterator(el.data.fields[0], dirty_model[el.key][rowsType][0], orig_model[el.key]);
          return;
        } else if (angular.isArray(orig_model[el.key])) {
          dirty_model[el.key][rowsType] = [];
          orig_model[el.key].forEach((record, index) => {
            var row = {};
            vm.dirtyFieldsIterator(el.data.fields[index], row, record);
            dirty_model[el.key][rowsType].push(row);
            return;
          });
        }
      }
      // fieldGroup (async_select, ...)
      if(el.fieldGroup) {
        vm.dirtyFieldsIterator(el.fieldGroup, dirty_model, orig_model);
        return;
      }
      // Copy regular field's value
      if(el.formControl && el.formControl.$dirty && orig_model.hasOwnProperty(el.key)) {
        dirty_model[el.key] = el.formControl.$modelValue || el.formControl.$viewValue;
      }
    });
  }
}

PayloadService.$inject = [];

export default angular.module('app.payload.service', [])
  .service('PayloadService', PayloadService)
  .name;
