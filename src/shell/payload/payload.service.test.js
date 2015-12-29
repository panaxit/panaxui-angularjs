import module from './payload.service'

describe('Service: Payload', () => {
  var PayloadService

  beforeEach(angular.mock.module(module))

  beforeEach(angular.mock.inject(function(_PayloadService_) {
    PayloadService = _PayloadService_
  }))

  describe('#build()', () => {

    it('should return empty payload with empty arguments', () => {
      var payload

      payload = PayloadService.build()
      expect(payload).to.deep.equal({})

      payload = PayloadService.build([], [], {})
      expect(payload).to.deep.equal({
        tableName: undefined,
        primaryKey: undefined,
        identityKey: undefined,
        foreignReference: undefined
      })
    })

    describe('formView', () => {

      describe('fieldset / tab', () => {
        var model = [{
          'Text': 'test'
        }]
        var fields = [
          [{
            'type': 'fieldset',
            'fields': [{
              'key': 'Text',
              'type': 'input',
              'formControl': {
                '$viewValue': 'test',
                '$modelValue': 'test',
                '$dirty': true,
              }
            }]
          }]
        ]
        var metadata = {
          'catalogName': 'TestSchema.TestTable',
          'mode': undefined
        }

        it(`Payload when metadata.mode = 'insert'`, () => {
          metadata.mode = 'insert'
          var payload = PayloadService.build(fields, model, metadata)
          expect(payload).to.deep.equal({
            tableName: metadata.catalogName,
            primaryKey: metadata.primaryKey,
            identityKey: metadata.identityKey,
            foreignReference: metadata.foreignReference,
            insertRows: model
          })
        })

        it(`Payload when metadata.mode = 'filters'`, () => {
          metadata.mode = 'filters'
          var payload = PayloadService.build(fields, model, metadata)
          expect(payload).to.deep.equal({
            tableName: metadata.catalogName,
            primaryKey: metadata.primaryKey,
            identityKey: metadata.identityKey,
            foreignReference: metadata.foreignReference,
            dataRows: model
          })
        })

        it(`Payload when metadata.mode = 'edit'`, () => {
          metadata.mode = 'edit'
          metadata.primaryKey = 'Id'
          metadata.identityKey = 'Id'
          model[0][metadata.primaryKey] = '1'
          var payload = PayloadService.build(fields, model, metadata)
          expect(payload).to.deep.equal({
            tableName: metadata.catalogName,
            primaryKey: metadata.primaryKey,
            identityKey: metadata.identityKey,
            foreignReference: metadata.foreignReference,
            updateRows: model
          })
        })
      })

      describe('tabPanel', () => {
        var model = [{
          'Text': 'test'
        }]
        var fields = [
          [{
            'type': 'tabpanel',
            'data': {
              'tabs': [{
                'key': 'Text',
                'type': 'input',
                'formControl': {
                  '$viewValue': 'test',
                  '$modelValue': 'test',
                  '$dirty': true,
                }
              }]
            }
          }]
        ]
        var metadata = {
          'catalogName': 'TestSchema.TestTable',
          'mode': undefined
        }

        it(`Payload when metadata.mode = 'insert'`, () => {
          metadata.mode = 'insert'
          var payload = PayloadService.build(fields, model, metadata)
          expect(payload).to.deep.equal({
            tableName: metadata.catalogName,
            primaryKey: metadata.primaryKey,
            identityKey: metadata.identityKey,
            foreignReference: metadata.foreignReference,
            insertRows: model
          })
        })

        it(`Payload when metadata.mode = 'filters'`, () => {
          metadata.mode = 'filters'
          var payload = PayloadService.build(fields, model, metadata)
          expect(payload).to.deep.equal({
            tableName: metadata.catalogName,
            primaryKey: metadata.primaryKey,
            identityKey: metadata.identityKey,
            foreignReference: metadata.foreignReference,
            dataRows: model
          })
        })

        it(`Payload when metadata.mode = 'edit'`, () => {
          metadata.mode = 'edit'
          metadata.primaryKey = 'Id'
          metadata.identityKey = 'Id'
          model[0][metadata.primaryKey] = '1'
          var payload = PayloadService.build(fields, model, metadata)
          expect(payload).to.deep.equal({
            tableName: metadata.catalogName,
            primaryKey: metadata.primaryKey,
            identityKey: metadata.identityKey,
            foreignReference: metadata.foreignReference,
            updateRows: model
          })
        })
      })

      describe('fieldGroup', () => {
        var model = [{
          'Text': 'test'
        }]
        var fields = [
          [{
            'type': 'fieldset',
            'fields': [{
              'fieldGroup': [{
                'key': 'Text',
                'type': 'input',
                'formControl': {
                  '$viewValue': 'test',
                  '$modelValue': 'test',
                  '$dirty': true,
                }
              }]
            }]
          }]
        ]
        var metadata = {
          'catalogName': 'TestSchema.TestTable',
          'mode': undefined
        }

        it(`Payload when metadata.mode = 'insert'`, () => {
          metadata.mode = 'insert'
          var payload = PayloadService.build(fields, model, metadata)
          expect(payload).to.deep.equal({
            tableName: metadata.catalogName,
            primaryKey: metadata.primaryKey,
            identityKey: metadata.identityKey,
            foreignReference: metadata.foreignReference,
            insertRows: model
          })
        })

        it(`Payload when metadata.mode = 'filters'`, () => {
          metadata.mode = 'filters'
          var payload = PayloadService.build(fields, model, metadata)
          expect(payload).to.deep.equal({
            tableName: metadata.catalogName,
            primaryKey: metadata.primaryKey,
            identityKey: metadata.identityKey,
            foreignReference: metadata.foreignReference,
            dataRows: model
          })
        })

        it(`Payload when metadata.mode = 'edit'`, () => {
          metadata.mode = 'edit'
          metadata.primaryKey = 'Id'
          metadata.identityKey = 'Id'
          model[0][metadata.primaryKey] = '1'
          var payload = PayloadService.build(fields, model, metadata)
          expect(payload).to.deep.equal({
            tableName: metadata.catalogName,
            primaryKey: metadata.primaryKey,
            identityKey: metadata.identityKey,
            foreignReference: metadata.foreignReference,
            updateRows: model
          })
        })
      })

      describe('nested form', () => {
        var model = [{
          'Text': 'test',
          'Nested': {
            'Inner': 'test_nested'
          }
        }]
        var metadata = {
          'catalogName': 'TestSchema.TestTable',
          'mode': undefined
        }
        var fields = [
          [{
            'type': 'fieldset',
            'fields': [{
              'key': 'Text',
              'type': 'input',
              'formControl': {
                '$viewValue': 'test',
                '$modelValue': 'test',
                '$dirty': true,
              }
            }, {
              'key': 'Nested',
              'type': 'form',
              'formControl': {
                '$viewValue': {
                  'Inner': 'test_nested'
                },
                '$modelValue': {
                  'Inner': 'test_nested'
                },
                '$dirty': true,
              },
              'data': {
                'metadata': {
                  'catalogName': 'TestSchema.NestedTable',
                  'mode': undefined
                },
                'fields': [{
                  'type': 'fieldset',
                  'fields': [{
                    'key': 'Inner',
                    'type': 'input',
                    'formControl': {
                      '$viewValue': 'test_nested',
                      '$modelValue': 'test_nested',
                      '$dirty': true,
                    }
                  }]
                }]
              }
            }]
          }]
        ]

        it(`Payload when metadata.mode = 'insert'`, () => {
          metadata.mode = 'insert'
          fields[0][0].fields[1].data.metadata.mode = 'insert'
          var payload = PayloadService.build(fields, model, metadata)
          var eq = {
            tableName: metadata.catalogName,
            primaryKey: metadata.primaryKey,
            identityKey: metadata.identityKey,
            foreignReference: metadata.foreignReference,
            insertRows: [{
              'Text': 'test',
              'Nested': {
                tableName: fields[0][0].fields[1].data.metadata.catalogName,
                primaryKey: fields[0][0].fields[1].data.metadata.primaryKey,
                identityKey: fields[0][0].fields[1].data.metadata.identityKey,
                foreignReference: fields[0][0].fields[1].data.metadata.foreignReference,
                insertRows: [{
                  'Inner': 'test_nested'
                }]
              }
            }]
          }
          expect(payload).to.deep.equal(eq)
        })

        it(`Payload when metadata.mode = 'edit'`, () => {
          metadata.mode = 'edit'
          metadata.primaryKey = 'Id'
          metadata.identityKey = 'Id'
          metadata.foreignReference = undefined
          fields[0][0].fields[1].data.metadata.mode = metadata.mode
          fields[0][0].fields[1].data.metadata.primaryKey = metadata.primaryKey
          fields[0][0].fields[1].data.metadata.identityKey = metadata.identityKey
          fields[0][0].fields[1].data.metadata.foreignReference = 'Id'
          model[0][metadata.primaryKey] = '1'
          model[0]['Nested'][metadata.primaryKey] = '1'
          var payload = PayloadService.build(fields, model, metadata)
          var eq = {
            tableName: metadata.catalogName,
            primaryKey: metadata.primaryKey,
            identityKey: metadata.identityKey,
            foreignReference: metadata.foreignReference,
            updateRows: [{
              'Id': model[0][metadata.primaryKey],
              'Text': 'test',
              'Nested': {
                tableName: fields[0][0].fields[1].data.metadata.catalogName,
                primaryKey: fields[0][0].fields[1].data.metadata.primaryKey,
                identityKey: fields[0][0].fields[1].data.metadata.identityKey,
                foreignReference: fields[0][0].fields[1].data.metadata.foreignReference,
                updateRows: [{
                  'Id': model[0]['Nested'][metadata.primaryKey],
                  'Inner': 'test_nested'
                }]
              }
            }]
          }
          expect(payload).to.deep.equal(eq)
        })
      })

      describe('nested grid', () => {
        var model = [{
          'Id': '1',
          'Text': 'test',
          'Nested': [{
            'Id': '1',
            'Inner': 'test_nested1'
          }, {
            'Id': '2',
            'Inner': 'test_nested2'
          }]
        }]

        it('PENDING')
      })

      describe('junction table', () => {

        it('PENDING')

      })

    })

    describe('gridView', () => {

      it('PENDING')

    })

    describe('masterDetail', () => {

      it('PENDING')

    })

  })
})
