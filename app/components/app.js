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
    this.count = 4;
    this.movingHolds = false;

    this.inputClimber = function() {
      for (var i = 0 ; i < this.holds.length ; i++) {
        this.holds[i].show = true;
      }
    }

    this.startCountdown = function () {
      this.countdown = $interval((function(){
        if (this.count === 1) {
          $interval.cancel(this.countdown);
          this.startTimer();
          this.state = "playing";
        } else {
          this.count--;
        }
      }).bind(this), 1000);
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
      this.scores.push([this.time, this.climber]);
      this.scores.sort();
    };

    this.keypress = function ($event) {
      if (this.state === "newRound") {
        if ($event.keyCode === 13 && this.climber!== "") {
          this.inputClimber();
          $scope.$apply(this.state = "waiting");
        }
      } else if (this.state === "waiting") {
        if ($event.keyCode === 109) {
          $scope.$apply(this.movingHolds = true);
          angular.element('.hold').mousedown(function(event) {
            var node = $(this);
            var position = node.offset();
            var initialized = {
              x : position.left - event.pageX,
              y : position.top - event.pageY
            };
            var handlers = {
              mousemove : function(e){
                node.css({
                  left : ( initialized.x + e.pageX ) + 'px',
                  top : ( initialized.y + e.pageY ) + 'px'
                });
              },
              mouseup : function(e){
                $(this).off(handlers);
              }
            }
            angular.element(document).on(handlers);
          });
        } else if ($event.keyCode === 32) {
          this.startCountdown();
          this.state = "countdown";
        } else if ($event.keyCode === 115) {
          angular.element('.hold').off('mousedown');
          $scope.$apply(this.movingHolds = false);
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
      this.count = 4;
    }

    window.onkeypress = this.keypress.bind(this);
  }
});