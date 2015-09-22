import module from './payload.service';

describe('Service: Payload', function() {
  var PayloadService;

  beforeEach(angular.mock.module(module));

  beforeEach(angular.mock.inject(function(_PayloadService_) {
    PayloadService = _PayloadService_;
  }));

  it('should return empty payload with build()', function() {
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
});
