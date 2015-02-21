/*var first = document.querySelector('#number1');
var second = document.querySelector('#number2');

var result = document.querySelector('.result');

if (!!window.Worker) {
    var myWorker = new Worker("worker.js");

    first.onchange = function() {
        myWorker.postMessage([first.value, second.value]);
        console.log('Message posted to worker');
    }

    second.onchange = function() {
        myWorker.postMessage([first.value, second.value]);
        console.log('Message posted to worker');
    }

    myWorker.onmessage = function(e) {
        result.textContent = e.data;
        console.log('Message received from worker');
    }
}*/

// console.log(angular.version);

(function() {
    function getWorker() {
        return new Worker("angular-worker.js");
    };

    angular.module('app', [])
        .controller('MainCtrl', function($scope) {
            var myWorker = getWorker();

            $scope.submit = function() {
                $scope.submitted = true;
                myWorker.postMessage({});
                console.log('Message posted to worker');
            };

            myWorker.onmessage = function(e) {
                $scope.submitted = false;
                console.log('Message received from worker');
                $scope.$apply();
            }
        });
})();
