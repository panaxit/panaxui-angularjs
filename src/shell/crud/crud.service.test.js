import module from './crud.service';
import '../auth/auth.service';

describe('Service: CRUD', () => {
  var $httpBackend,
      CRUDService,
      AuthService,
      md5;

  beforeEach(angular.mock.module(module));

  // E2E Workaround:
  // http://www.bradoncode.com/blog/2015/06/16/unit-test-http-ngmock-passthrough/
  beforeEach(angular.mock.http.init);
  afterEach(angular.mock.http.reset);

  beforeEach(angular.mock.inject(function(_$httpBackend_, _CRUDService_, _AuthService_, _md5_) {
    $httpBackend = _$httpBackend_;
    CRUDService = _CRUDService_;
    AuthService = _AuthService_;
    md5 = _md5_;

    AuthService.login({
      username: 'webmaster',
      password: md5.createHash('tests'),
      instance: 'Demo',
    })

    CRUDService.setBaseURL('http://localhost:3000');
  }));

  it('Read', (done) => {
    $httpBackend.whenGET('http://localhost:3000/api/read?gui=ng&output=json').passThrough();

    CRUDService.read({})
      .then((res) => {
        console.log(res)
        //expect(res).to.equal({});
        done();
      }, (err) => {
        console.log(err)
        //expect(err).to.equal({});
        done();
      });
  });

});
