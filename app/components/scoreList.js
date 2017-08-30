angular.module('randori')
.component('scoreList', {
  templateUrl: 'app/templates/scoreList.html',
  bindings: {
    scores : '<'
  }
});