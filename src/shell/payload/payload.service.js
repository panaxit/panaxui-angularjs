import angular from 'angular'

class PayloadService {
  constructor() {}

  // Create data table payload to be sent
  build(fields, model, metadata) {
    var vm = this
    var payload

    if (!metadata) {
      return {}
    }

    payload = {
      tableName: metadata.catalogName,
      primaryKey: metadata.primaryKey,
      identityKey: metadata.identityKey,
      foreignReference: metadata.foreignReference,
    }

    if (metadata.mode === 'insert') {
      payload.insertRows = []
      model.forEach((record, index) => {
        var row = {}
        vm.dirtyFieldsIterator(fields[index], row, record)
        payload.insertRows.push(row)
      })
    } else if (metadata.mode === 'edit') {
      payload.updateRows = []
      model.forEach((record, index) => {
        var row = {}
        vm.dirtyFieldsIterator(fields[index], row, record)
          // Set primaryKey and/or identityKey as DataRow with current value
        if (!!payload.primaryKey) {
          row[payload.primaryKey] = record[payload.primaryKey]
        }
        if (!!payload.identityKey) {
          row[payload.identityKey] = record[payload.identityKey]
        }
        payload.updateRows.push(row)
      })
    } else if (metadata.mode === 'filters') {
      payload.dataRows = []
      model.forEach((record, index) => {
        var row = {}
        vm.dirtyFieldsIterator(fields[index], row, record)
        payload.dataRows.push(row)
      })
    }

    return payload
  }

  dirtyFieldsIterator(fields, payload, origModel) {
    var vm = this

    angular.forEach(fields, function(el) {
      if (el.fields) {
        /*
        fieldset / tab
         */
        vm.dirtyFieldsIterator(el.fields, payload, origModel)
        return
      } else if (el.fieldGroup) {
        /*
        fieldGroup (asyncSelect, ...)
         */
        vm.dirtyFieldsIterator(el.fieldGroup, payload, origModel)
        return
      } else if (el.type && el.type === 'tabpanel' && el.data && el.data.tabs) {
        /*
        tabPanel
         */
        vm.dirtyFieldsIterator(el.data.tabs, payload, origModel)
        return
      } else if (el.data && el.data.fields && el.type === 'form') {
        /*
        nested form
         */
        payload[el.key] = vm.build([el.data.fields], [origModel[el.key]], el.data.metadata)
        return
      }

      // Copy field's value
      if (origModel.hasOwnProperty(el.key) && (el.formControl && el.formControl.$dirty)) {
        payload[el.key] = el.formControl.$modelValue || el.formControl.$viewValue
      }
    })
  }
}

PayloadService.$inject = []

export default angular.module('app.payload.service', [])
  .service('PayloadService', PayloadService)
  .name
