var app = angular.module("appLiveLesson", []);

app.controller("liveLessonController", ["$scope", "$http", "$interval", function ($scope, $http, $interval) {

    $scope.bIsFollow = false;
    var stopFollow;

    $scope.startFollow = function () {

        $scope.bIsFollow = true;

        $scope.directionCounter = {
            Right: 0,
            Left: 0,
            Front: 0,
            Back: 0
        };

        $scope.previousPosition = {
            direction: "",
            count: 0
        };

        stopFollow = $interval(function () {

            $http({
                method: "GET",
                url: "http://katimbapp.herokuapp.com/GetCurrPoint"
            }).then(function (currentPosition) {

                var checkPositonFunc = function (direction) {
                    $scope.directionCounter[direction]++;

                    if ($scope.previousPosition.direction == direction) {
                        $scope.previousPosition.count++;
                    } else {
                        $scpoe.previousPosition = {
                            direction: direction,
                            count: 0
                        };
                    }
                };

                // Count the current position and update the prev direction
                if (currentPosition.Right) {
                    checkPositonFunc("Right");
                } else if (currentPosition.Left) {
                    checkPositonFunc("Left");
                } else if (currentPosition.Back) {
                    checkPositonFunc("Back");
                } else if (currentPosition.Front) {
                    checkPositonFunc("Front");
                }
            });

        }, 1000);

    };

    $scope.stopFollow = function () {
        $scope.bIsFollow = false;

        $interval.cancel(stopFollow);
        stopFollow = undefined;
    };


}]);
