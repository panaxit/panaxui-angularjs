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

    describe(`catalog.mode = 'insert'`, () => {

      it('should return simple payload');

    });

    describe(`catalog.mode = 'edit'`, () => {

      it('should return simple payload');

    });

    describe(`catalog.mode = 'filters'`, () => {

      it('should return simple payload');

    });

  });
});
