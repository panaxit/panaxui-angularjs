import module from './filters'

describe('Filters', () => {

  beforeEach(angular.mock.module(module))

  describe('Min', () => {
    var minFilter

    beforeEach(angular.mock.inject(function(_minFilter_) {
      minFilter = _minFilter_
    }))

    it('should get Infinity from nothing', () => {
      var values
      var min = minFilter(values)
      expect(min).to.equal(Infinity)

      values = []
      min = minFilter(values)
      expect(min).to.equal(Infinity)
    })

    it('should get the min value from array', () => {
      var values = [0, 10, -1, 56]
      var min = minFilter(values)
      expect(min).to.equal(-1)
    })

  })

})
