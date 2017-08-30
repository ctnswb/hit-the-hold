angular.module('randori')
.component('countdown', {
  templateUrl: 'app/templates/countdown.html',
  bindings: {
    count: '<'
  }
});