import angular from 'angular';

class PayloadService {
  constructor() {
  }

  setName(name) {
    this.name = name;
  }

  getName() {
    return this.name;
  }

  notCovered() {
    return 'this is not covered';
  }
}

PayloadService.$inject = [];

export default angular.module('app.payload.service', [])
  .service('PayloadService', PayloadService)
  .name;
