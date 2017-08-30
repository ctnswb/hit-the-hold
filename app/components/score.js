angular.module('randori')
.component('score', {
  templateUrl: 'app/templates/score.html',
  bindings: {
    score: '<'
  }
});