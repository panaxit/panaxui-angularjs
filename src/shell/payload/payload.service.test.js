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
        identityKey: undefined
      });
    });

    describe('Simple fieldset', () => {
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
          updateRows: model
        });
      });
    });

  });
});
