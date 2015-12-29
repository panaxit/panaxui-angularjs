import module from './auth.service'

describe('Service: Auth', () => {
  var $httpBackend,
    AuthService,
    SessionService

  var baseURL = 'http://localhost:3001'

  beforeEach(() => {
    angular.mock.module('app.session.service')
    angular.mock.module(module)
  })

  beforeEach(angular.mock.inject(function(_$httpBackend_, _AuthService_, _SessionService_) {
    $httpBackend = _$httpBackend_
    AuthService = _AuthService_
    SessionService = _SessionService_
    AuthService.setBaseURL(baseURL)
  }))

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation()
    $httpBackend.verifyNoOutstandingRequest()
  })

  describe('#login()', () => {

    let url = baseURL + '/api/session/login'

    it('should call with any credentials', function() {
      $httpBackend.expectPOST(url).respond(200, {
        data: {}
      })

      AuthService.login({})

      $httpBackend.flush()
    })

  })

  describe('#sessionInfo()', () => {

    let url = baseURL + '/api/session/info'

    it('should call succesfully (logged in)', function() {
      $httpBackend.expectGET(url).respond(200, {
        data: {}
      })

      AuthService.sessionInfo({})

      $httpBackend.flush()
    })

    it('should call unsuccesfully (logged out)', function() {
      $httpBackend.expectGET(url).respond(401, {
        data: {}
      })

      AuthService.sessionInfo({})

      $httpBackend.flush()
    })

  })

  describe('#sitemap()', () => {

    let url = baseURL + '/api/session/sitemap?gui=ng'

    it('should call default', function() {
      $httpBackend.expectGET(url).respond(200, {
        data: {}
      })

      AuthService.sitemap({})

      $httpBackend.flush()
    })

  })

  describe('#logout()', () => {

    let url = baseURL + '/api/session/logout'

    it('should call succesfully', function() {
      $httpBackend.expectGET(url).respond(200, {
        data: {}
      })

      AuthService.logout({})

      $httpBackend.flush()
    })

    it('should call unsuccesfully', function() {
      $httpBackend.expectGET(url).respond(401, {
        data: {}
      })

      AuthService.logout({})

      $httpBackend.flush()
    })

  })

})
