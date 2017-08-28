angular.module('randori')
.component('timer', {
  templateUrl: 'app/templates/timer.html',
  bindings: {
    time: '<'
  }
});