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
                url: "/GetCurrPoint"
            }).then(function (response) {
                var currentPosition = response.data;
                   
                var checkPositonFunc = function (direction) {
                    
                    $scope.directionCounter[direction]++;

                    if ($scope.previousPosition.direction == direction) {
                        $scope.previousPosition.count++;
                    } else {
                        $scope.previousPosition = {
                            direction: direction,
                            count: 0
                        };
                    }
                };

                // Count the current position and update the prev direction
                if (currentPosition.Right) {
                    $scope.currentPosition = "ימין";
                    checkPositonFunc("Right");
                } else if (currentPosition.Left) {
                    $scope.currentPosition = "שמאל";
                    checkPositonFunc("Left");
                } else if (currentPosition.Back) {
                    $scope.currentPosition = "מאחור";
                    checkPositonFunc("Back");
                } else if (currentPosition.Front) {
                    $scope.currentPosition = "מקדימה";
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
