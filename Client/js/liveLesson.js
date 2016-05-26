
var app = angular.module("appLiveLesson", []);

app.controller("liveLessonController", ["$scope", "$http", "$interval", function ($scope, $http, $interval) {

    $scope.bIsFollow = false;
    var stopFollow;

    $scope.startFollow = function () {

        $scope.bIsFollow = true;

        $scope.directionCounter = {
            Right: 0,
            Left: 0,
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
                }
            });

        }, 1000);

    };

    $scope.stopFollow = function () {
        $scope.bIsFollow = false;

        $interval.cancel(stopFollow);
        stopFollow = undefined;

    };

//    var canv = document.getElementById('canvasboard');
//    var ctx = canv.getContext('2d');
//    $scope.currx = 200;
//    $scope.curry = 200;
//    $scope.nextX = 250;
//    $scope.nextY = 250;
//    draw($scope.currx, $scope.curry, $scope.nextX, $scope.nextY);


}]);


app.directive('canvasboard', function(){
    return {
        restrict : 'A',
        link : function (scope, element){
                var ctx = element[0].getContext('2d');
                scope.currx = 200;
                scope.curry = 200;
                scope.nextX = 250;
                scope.nextY = 250;
                draw(scope.currx, scope.curry, scope.nextX, scope.nextY, ctx);
            
//            scope.currx = 250;
//                scope.curry = 250;
//                scope.nextX = 250;
//                scope.nextY = 100;
//                draw(scope.currx, scope.curry, scope.nextX, scope.nextY, ctx);
//            
//            scope.currx = 250;
//                scope.curry = 100;
//                scope.nextX = 200;
//                scope.nextY = 200;
//                draw(scope.currx, scope.curry, scope.nextX, scope.nextY, ctx);

        }
    }
})
/*********************************/
/*Maayan Shit goes here*/



function Frame(ctx) {

    //Stage
    ctx.beginPath();
    ctx.rect(70, 275, 460, -60);
    ctx.fillStyle = 'rgb(203, 151, 80)';
    ctx.fill();
    ctx.closePath();

    // Board
    ctx.beginPath();
    ctx.fillStyle = 'rgba(0, 0, 0, 0.81)';
    ctx.fillRect(100, 275, 400, -10);
    ctx.closePath();

    // Class
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, 275);
    ctx.lineTo(600, 275);
    ctx.lineTo(600, 0);
    ctx.lineTo(0, 0);
    ctx.closePath();
    ctx.strokeStyle = 'black';
    ctx.lineWidth = '30px';
    ctx.stroke();
    ctx.closePath();

    // Left
    ctx.beginPath();
    ctx.moveTo(0, 170);
    ctx.arc(0, 170, 20, 90, 2 * Math.PI, true);
    ctx.strokeStyle = 'black';
    ctx.stroke();
    ctx.fillStyle = 'rgba(0, 245, 255, 0.33)';
    ctx.fill();
    ctx.closePath();

    // Right
    ctx.beginPath();
    ctx.moveTo(600, 170);
    ctx.arc(600, 170, 20, 0, 2 * Math.PI, false);
    ctx.strokeStyle = 'black'
    ctx.stroke();
    ctx.fillStyle = 'rgba(222, 25, 239, 0.37)';
    ctx.fill();
    ctx.closePath();

    //Front
    ctx.beginPath();
    ctx.moveTo(290, 275);
    ctx.arc(300, 280, 20, 0, 2 * Math.PI, false);
    ctx.strokeStyle = 'black';
    ctx.stroke();
    ctx.fillStyle = 'rgba(0, 255, 98, 0.75)';
    ctx.fill();
    ctx.closePath();
}


function Charachter(xPos, yPos, ctx) {

    // Store the current transformation matrix
    ctx.save();

    // Use the identity matrix while clearing the canvas
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, 600, 275);

    // Restore the transform
    ctx.restore();



    Frame(ctx);
    ctx.beginPath();
    ctx.strokeStyle = 'black'
    ctx.arc(xPos, yPos, 10, 0, 2 * Math.PI, false);
    ctx.stroke();
    ctx.fillStyle = 'rgba(3, 123, 3, 0.57)';
    ctx.fill();


}

/*This will be reinitializing the map each time*/
function draw(currx, curry, newx, newy, ctx) {

    Charachter(currx, curry, ctx);

    if (currx - newx != 0) {
        var xDiff = (currx - newx) / 60;
        var yDiff = (curry - newy) / 60;
        var loopI = 1;

        function myLoop() {
            setTimeout(function () {
                if (loopI < 60) {
                    Charachter(currx + xDiff * loopI, curry + yDiff * loopI, ctx);
                    loopI++;
                    myLoop();
                }

            }, 15);
        }
        myLoop();
    }
}


//app.controller("CanvasCtrl", function ($scope, $interval) {
//    var canv = document.getElementById('board');
//    var ctx = canv.getContext('2d');
//    $scope.currx = 200;
//    $scope.curry = 200;
//    $scope.nextX = 250;
//    $scope.nextY = 250;
//    draw($scope.currx, $scope.curry, $scope.nextX, $scope.nextY);
//
//});