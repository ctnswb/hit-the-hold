angular.module('randori')
.component('app', {
  templateUrl: 'app/templates/app.html',
  controller: function ($interval) {
    this.holds = [{name: '1', location: [100,100]}, {name: '2', location: [150, 200]}, {name: '3', location: [170,300]}];
    this.time = 0;
    this.play = function () {
      console.log('PLAY NOW');
      this.timer = $interval(this.increment, 1000);
    };
    this.increment = (function() {
      this.time++;
    }).bind(this);
    this.end = function () {
      $interval.cancel(this.timer);
    };
  }
});