angular.module('randori')
.component('app', {
  templateUrl: 'app/templates/app.html',
  controller: function ($interval, $scope) {
    this.climber = '';
    this.scores = [];
    this.holds = [{name: '1', location: [200,180], show: false}, {name: '2', location: [600, 200], show: false}, {name: '3', location: [170,500], show: false} , {name: '4', location: [450,300], show: false} , {name: '5', location: [380,480], show: false}];
    this.time = "0.00";
    this.unformattedTime = 0;
    this.touchCount = 0;
    this.state = "newRound";

    this.inputClimber = function() {
      for (var i = 0 ; i < this.holds.length ; i++) {
        this.holds[i].show = true;
      }
    }

    this.countDown = function () {

    }

    this.startTimer = function () {
      this.timer = $interval((this.incrementTimer).bind(this), 10);
    };

    this.incrementTimer = function() {
      this.unformattedTime = this.unformattedTime + 0.01;
      this.time = this.unformattedTime.toFixed(2);
    };

    this.end = function () {
      $interval.cancel(this.timer);
      this.scores.push({name: this.climber, time: this.time});
    };

    this.keypress = function ($event) {
      if (this.state === "newRound") {
        if ($event.keyCode === 13 && this.climber!== "") {
          this.inputClimber();
          $scope.$apply(this.state = "waiting");
        }
      } else if (this.state === "waiting") {
        if ($event.keyCode === 32) {
          this.startTimer();
          this.state = "playing";
        }
      } else if (this.state === "playing") {
        if ($event.keyCode === 32) {
          this.touchCount++;
          $scope.$apply(this.holds[this.touchCount - 1].show = false);
          if (this.touchCount >= this.holds.length) {
            this.end();
            $scope.$apply(this.state = "done");
          }
        }
      }
    }

    this.newRound = function () {
      this.time = "0.00";
      this.unformattedTime = 0;
      this.climber = '';
      this.touchCount = 0;
      this.state = "newRound";
    }

    window.onkeypress = this.keypress.bind(this);
  }
});