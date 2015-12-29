import module from './index'
import module_auth from '../auth'

describe('Controller: Login', () => {
  var $controller,
    $q,
    $rootScope,
    AUTH_EVENTS,
    AuthService,
    md5,
    ctrl

  beforeEach(angular.mock.module('app.session.service'))
  beforeEach(angular.mock.module(module_auth))
  beforeEach(angular.mock.module(module))

  beforeEach(angular.mock.inject(function(_$controller_, _$q_, _$rootScope_, _AUTH_EVENTS_, _AuthService_, _md5_) {
    $controller = _$controller_
    $q = _$q_
    $rootScope = _$rootScope_
    AUTH_EVENTS = _AUTH_EVENTS_
    AuthService = _AuthService_
    md5 = _md5_
    ctrl = $controller('LoginCtrl', {
      AuthService: AuthService
    })
  }))

  it('broadcast login success on #login()') // ToDo: Use Sinion spies

})
