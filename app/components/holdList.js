angular.module('randori')
.component('holdList', {
  templateUrl: 'app/templates/holdList.html',
  bindings: {
    holds : '<',
    moveHold : '='
  }
});