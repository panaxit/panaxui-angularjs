import module from './crud.service'

describe('Service: CRUD', () => {
  var $httpBackend,
    CRUDService

  var baseURL = 'http://localhost:3001'

  beforeEach(angular.mock.module(module))

  beforeEach(angular.mock.inject(function(_$httpBackend_, _CRUDService_) {
    $httpBackend = _$httpBackend_
    CRUDService = _CRUDService_
    CRUDService.setBaseURL(baseURL)
  }))

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation()
    $httpBackend.verifyNoOutstandingRequest()
  })

  describe('#read()', () => {

    let url = baseURL + '/api/read'

    it('should call with no params', function() {
      $httpBackend.expectGET(url + '?gui=ng&output=json').respond(200, {})

      CRUDService.read({})

      $httpBackend.flush()
    })

    it('should call with arbitrary params', function() {
      $httpBackend.expectGET(url + '?a=b&c=d&gui=ng&output=json').respond(200, {})

      CRUDService.read({
        a: 'b',
        c: 'd'
      })

      $httpBackend.flush()
    })

  })

  describe('#options()', () => {

    let url = baseURL + '/api/options'

    it('should call with foreignEntity params', function() {
      let filters = encodeURIComponent(`[Id='1']`)
      let expectedParams = '?array=true&filters=' + filters +
        '&foreignEntity=Parent&foreignKey=Id&foreignValue=1&gui=ng'
      $httpBackend.expectGET(url + expectedParams).respond(200, {})

      CRUDService.options({
        foreignEntity: 'Parent',
        foreignKey: 'Id',
        foreignValue: '1'
      })

      $httpBackend.flush()
    })

  })

  describe('#create()', () => {

    let url = baseURL + '/api/create'

    it('should call with any payload', function() {
      $httpBackend.expectPOST(url).respond(200, {})

      CRUDService.create({})

      $httpBackend.flush()
    })

  })

  describe('#update()', () => {

    let url = baseURL + '/api/update'

    it('should call with any payload', function() {
      $httpBackend.expectPUT(url).respond(200, {})

      CRUDService.update({})

      $httpBackend.flush()
    })

  })

  describe('#delete()', () => {

    let url = baseURL + '/api/delete'

    it('should call with any payload', function() {
      $httpBackend.expectDELETE(url).respond(200, {})

      CRUDService.delete({})

      $httpBackend.flush()
    })

  })

  describe('#filters()', () => {

    let url = baseURL + '/api/filters'

    it('should call with any payload', function() {
      $httpBackend.expectPOST(url).respond(200, {})

      CRUDService.filters({})

      $httpBackend.flush()
    })

  })

})
