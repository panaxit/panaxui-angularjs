import module from './payload.service';

describe('Service: Payload', () => {
  var PayloadService;

  beforeEach(angular.mock.module(module));

  beforeEach(angular.mock.inject(function(_PayloadService_) {
    PayloadService = _PayloadService_;
  }));

  describe('#build()', () => {

    it('should return empty payload with empty arguments', () => {
      var payload;

      payload = PayloadService.build();
      expect(payload).to.deep.equal({});

      payload = PayloadService.build([], [], {});
      expect(payload).to.deep.equal({
        tableName: undefined,
        primaryKey: undefined,
        identityKey: undefined,
        foreignReference: undefined
      });
    });

    describe('fieldset / tab', () => {
      var model = [{
        "Text": "test"
      }];
      var fields = [[{
        "type": "fieldset",
        "fields": [{
          "key": "Text",
          "type": "input",
          "formControl": {
            "$viewValue": "test",
            "$modelValue": "test",
            "$dirty": true,
          }
        }]
      }]];
      var catalog = {
        "catalogName": "TestSchema.TestTable",
        "mode": undefined
      }

      it(`Payload when catalog.mode = 'insert'`, () => {
        catalog.mode = "insert";
        var payload = PayloadService.build(fields, model, catalog);
        expect(payload).to.deep.equal({
          tableName: catalog.catalogName,
          primaryKey: catalog.primaryKey,
          identityKey: catalog.identityKey,
          foreignReference: catalog.foreignReference,
          insertRows: model
        });
      });

      it(`Payload when catalog.mode = 'filters'`, () => {
        catalog.mode = "filters";
        var payload = PayloadService.build(fields, model, catalog);
        expect(payload).to.deep.equal({
          tableName: catalog.catalogName,
          primaryKey: catalog.primaryKey,
          identityKey: catalog.identityKey,
          foreignReference: catalog.foreignReference,
          dataRows: model
        });
      });

      it(`Payload when catalog.mode = 'edit'`, () => {
        catalog.mode = "edit";
        catalog.primaryKey = "Id";
        catalog.identityKey = "Id";
        model[0][catalog.primaryKey] = "1";
        var payload = PayloadService.build(fields, model, catalog);
        expect(payload).to.deep.equal({
          tableName: catalog.catalogName,
          primaryKey: catalog.primaryKey,
          identityKey: catalog.identityKey,
          foreignReference: catalog.foreignReference,
          updateRows: model
        });
      });
    });

    describe('tabPanel', () => {
      var model = [{
        "Text": "test"
      }];
      var fields = [[{
        "type": "fieldset",
        "fields": [{
          "type": "tabPanel",
          "tabs": [{
            "key": "Text",
            "type": "input",
            "formControl": {
              "$viewValue": "test",
              "$modelValue": "test",
              "$dirty": true,
            }
          }]
        }]
      }]];
      var catalog = {
        "catalogName": "TestSchema.TestTable",
        "mode": undefined
      }

      it(`Payload when catalog.mode = 'insert'`, () => {
        catalog.mode = "insert";
        var payload = PayloadService.build(fields, model, catalog);
        expect(payload).to.deep.equal({
          tableName: catalog.catalogName,
          primaryKey: catalog.primaryKey,
          identityKey: catalog.identityKey,
          foreignReference: catalog.foreignReference,
          insertRows: model
        });
      });

      it(`Payload when catalog.mode = 'filters'`, () => {
        catalog.mode = "filters";
        var payload = PayloadService.build(fields, model, catalog);
        expect(payload).to.deep.equal({
          tableName: catalog.catalogName,
          primaryKey: catalog.primaryKey,
          identityKey: catalog.identityKey,
          foreignReference: catalog.foreignReference,
          dataRows: model
        });
      });

      it(`Payload when catalog.mode = 'edit'`, () => {
        catalog.mode = "edit";
        catalog.primaryKey = "Id";
        catalog.identityKey = "Id";
        model[0][catalog.primaryKey] = "1";
        var payload = PayloadService.build(fields, model, catalog);
        expect(payload).to.deep.equal({
          tableName: catalog.catalogName,
          primaryKey: catalog.primaryKey,
          identityKey: catalog.identityKey,
          foreignReference: catalog.foreignReference,
          updateRows: model
        });
      });
    });

    describe('fieldGroup', () => {
      var model = [{
        "Text": "test"
      }];
      var fields = [[{
        "type": "fieldset",
        "fields": [{
          "fieldGroup": [{
            "key": "Text",
            "type": "input",
            "formControl": {
              "$viewValue": "test",
              "$modelValue": "test",
              "$dirty": true,
            }
          }]
        }]
      }]];
      var catalog = {
        "catalogName": "TestSchema.TestTable",
        "mode": undefined
      }

      it(`Payload when catalog.mode = 'insert'`, () => {
        catalog.mode = "insert";
        var payload = PayloadService.build(fields, model, catalog);
        expect(payload).to.deep.equal({
          tableName: catalog.catalogName,
          primaryKey: catalog.primaryKey,
          identityKey: catalog.identityKey,
          foreignReference: catalog.foreignReference,
          insertRows: model
        });
      });

      it(`Payload when catalog.mode = 'filters'`, () => {
        catalog.mode = "filters";
        var payload = PayloadService.build(fields, model, catalog);
        expect(payload).to.deep.equal({
          tableName: catalog.catalogName,
          primaryKey: catalog.primaryKey,
          identityKey: catalog.identityKey,
          foreignReference: catalog.foreignReference,
          dataRows: model
        });
      });

      it(`Payload when catalog.mode = 'edit'`, () => {
        catalog.mode = "edit";
        catalog.primaryKey = "Id";
        catalog.identityKey = "Id";
        model[0][catalog.primaryKey] = "1";
        var payload = PayloadService.build(fields, model, catalog);
        expect(payload).to.deep.equal({
          tableName: catalog.catalogName,
          primaryKey: catalog.primaryKey,
          identityKey: catalog.identityKey,
          foreignReference: catalog.foreignReference,
          updateRows: model
        });
      });
    });

    describe('nested form', () => {
      var model = [{
        "Text": "test",
        "Nested": {"Inner": "test_nested"}
      }];
      var catalog = {
        "catalogName": "TestSchema.TestTable",
        "mode": undefined
      }
      var fields = [[{
        "type": "fieldset",
        "fields": [{
          "key": "Text",
          "type": "input",
          "formControl": {
            "$viewValue": "test",
            "$modelValue": "test",
            "$dirty": true,
          }
        }, {
          "key": "Nested",
          "type": "form",
          "formControl": {
            "$viewValue": {"Inner": "test_nested"},
            "$modelValue": {"Inner": "test_nested"},
            "$dirty": true,
          },
          "data": {
            "catalog": {
              "catalogName": "TestSchema.NestedTable",
              "mode": undefined
            },
            "fields":[{
              "type": "fieldset",
              "fields": [{
                "key": "Inner",
                "type": "input",
                "formControl": {
                  "$viewValue": "test_nested",
                  "$modelValue": "test_nested",
                  "$dirty": true,
                }
              }]
            }]
          }
        }]
      }]];

      it(`Payload when catalog.mode = 'insert'`, () => {
        catalog.mode = "insert";
        fields[0][0].fields[1].data.catalog.mode = "insert";
        var payload = PayloadService.build(fields, model, catalog);
        var eq = {
          tableName: catalog.catalogName,
          primaryKey: catalog.primaryKey,
          identityKey: catalog.identityKey,
          foreignReference: catalog.foreignReference,
          insertRows: [{
            "Text": "test",
            "Nested": {
              tableName: fields[0][0].fields[1].data.catalog.catalogName,
              primaryKey: fields[0][0].fields[1].data.catalog.primaryKey,
              identityKey: fields[0][0].fields[1].data.catalog.identityKey,
              foreignReference: fields[0][0].fields[1].data.catalog.foreignReference,
              insertRows: [{
                "Inner": "test_nested"
              }]
            }
          }]
        };
        expect(payload).to.deep.equal(eq);
      });

      it(`Payload when catalog.mode = 'edit'`, () => {
        catalog.mode = "edit";
        catalog.primaryKey = "Id";
        catalog.identityKey = "Id";
        catalog.foreignReference = undefined;
        fields[0][0].fields[1].data.catalog.mode = catalog.mode;
        fields[0][0].fields[1].data.catalog.primaryKey = catalog.primaryKey;
        fields[0][0].fields[1].data.catalog.identityKey = catalog.identityKey;
        fields[0][0].fields[1].data.catalog.foreignReference = "Id";
        model[0][catalog.primaryKey] = "1";
        model[0]["Nested"][catalog.primaryKey] = "1";
        var payload = PayloadService.build(fields, model, catalog);
        var eq = {
          tableName: catalog.catalogName,
          primaryKey: catalog.primaryKey,
          identityKey: catalog.identityKey,
          foreignReference: catalog.foreignReference,
          updateRows: [{
            "Id": model[0][catalog.primaryKey],
            "Text": "test",
            "Nested": {
              tableName: fields[0][0].fields[1].data.catalog.catalogName,
              primaryKey: fields[0][0].fields[1].data.catalog.primaryKey,
              identityKey: fields[0][0].fields[1].data.catalog.identityKey,
              foreignReference: fields[0][0].fields[1].data.catalog.foreignReference,
              updateRows: [{
                "Id": model[0]["Nested"][catalog.primaryKey],
                "Inner": "test_nested"
              }]
            }
          }]
        };
        expect(payload).to.deep.equal(eq);
      });

    });

    describe('nested grid', () => {
      var model = [{
        "Id": "1",
        "Text": "test",
        "Nested": [
          {"Id": "1", "Inner": "test_nested1"},
          {"Id": "2", "Inner": "test_nested2"}
        ]
      }];

      it('PENDING');

    });

  });
});
