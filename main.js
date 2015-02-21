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

    function compute() {
        console.log('submit clicked');
        for (var i = 0; i < 10000000; i++) {
            for (var j = 0; j < 1000; j++) {
                var p = (i * j) % (i + j);
            }
        }
        console.log('computation done with i=' + i);
        return {};
    }

    angular.module('app', [])
        .controller('MainCtrl', function($scope) {
            var myWorker = getWorker();
            var vm = this;
            vm.submit = function() {
                // compute();
                vm.submitted = true;
                myWorker.postMessage({});
                console.log('Message posted to worker');
            };

            myWorker.onmessage = function(e) {
                vm.submitted = false;
                console.log('Message received from worker');
                $scope.$apply();
            }
        })
        .controller('SecondCtrl', function($scope) {
            var myWorker = getWorker();
            var vm = this;
            vm.submit = function() {
                // compute();
                vm.submitted = true;
                myWorker.postMessage({});
                console.log('Message posted to worker');
            };

            myWorker.onmessage = function(e) {
                vm.submitted = false;
                console.log('Message received from worker');
                $scope.$apply();
            }
        });
})();
