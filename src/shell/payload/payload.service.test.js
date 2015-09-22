import module from './payload.service';

describe('Service: Payload', function() {
  var PayloadService;

  beforeEach(angular.mock.module(module));

  beforeEach(angular.mock.inject(function(_PayloadService_) {
    PayloadService = _PayloadService_;
  }));

  it('should set name with constructor and get it with #getName()', function() {
    var name = PayloadService.getName();
    expect(name).to.equal(undefined);

    PayloadService.setName('pedro');
    name = PayloadService.getName();
    expect(name).to.equal('pedro');
  });
});
