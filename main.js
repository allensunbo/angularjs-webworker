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
        for (var i = 0; i < 4000000; i++) {
            for (var j = 0; j < 1000; j++) {
                var p = (i * j) % (i + j);
            }
        }
        console.log('computation done with i=' + i);
        return {};
    }

    angular.module('app', ['ui.bootstrap'])
        .controller('FirstCtrl', function($scope, $rootScope) {
            var myWorker = getWorker();
            var vm = this;
            vm.progress = 0;
            vm.submit = function() {
                // compute();
                vm.submitted = true;
                vm.progress = 0;
                myWorker.postMessage({});
                $rootScope.$broadcast('FirstCtrlRun');
                console.log('Message posted to worker');
            };

            myWorker.onmessage = function(e) {
                vm.submitted = false;
                vm.progress = 100;
                console.log('Message received from worker');
                $scope.$apply();
                $rootScope.$broadcast('FirstCtrlResult', {
                    'result': 20
                });
            }
        })
        .controller('SecondCtrl', function($scope, $rootScope) {
            var myWorker = getWorker();
            var vm = this;
            vm.progress = 0;
            vm.submit = function() {
                // compute();
                vm.submitted = true;
                myWorker.postMessage({});
                $rootScope.$broadcast('SecondCtrlRun');
                console.log('Message posted to worker');
            };

            myWorker.onmessage = function(e) {
                vm.submitted = false;
                console.log('Message received from worker');
                $scope.$apply();
                $rootScope.$broadcast('SecondCtrlResult', {
                    'result': 30
                });
            }
        })
        .controller('MainCtrl', function($scope) {
            var vm = this;
            //vm.firstResult = vm.secondResult = undefined;
            vm.finalResult = undefined;

            $scope.$on('FirstCtrlRun', function(event, data) {
                vm.firstResult = undefined;
                vm.finalResult = undefined;
            });

            $scope.$on('SecondCtrlRun', function(event, data) {
                vm.secondResult = undefined;
                vm.finalResult = undefined;
            });

            $scope.$on('FirstCtrlResult', function(event, data) {
                vm.firstResult = data.result;
                processResults(vm, $scope);
            });

            $scope.$on('SecondCtrlResult', function(event, data) {
                vm.secondResult = data.result;
                processResults(vm, $scope);
            });

        })
        .controller('NonWorkerCtrl', function($scope, $q, $timeout) {
            var vm = this;
            var promises = [];
            vm.doQuery = function() {
                console.log('doQuery');
                promises = [];
                for (var i = 0; i < 10; i++) {
                    promises.push(query('url-' + i, $q, $timeout));
                }

                for (var i = 0; i < promises.length; i++) {
                    handleQuery(promises[i]);
                }
            };
        })
        .controller('WorkerCtrl', function($scope, $q, $timeout) {
            var myWorker = new Worker('worker.js');
            var vm = this;
            var promises = [];
            vm.doQuery = function() {
                console.log('doQuery');
                myWorker.postMessage({
                });
            };
        });

    function handleQuery(promise) {
        promise.then(function(data) {
                console.log(data);
            },
            function(reason) {

            });
    }

    function query(_url, $q, $timeout) {
        var defer = $q.defer();
        var delay = Math.random() * 5000;
        $timeout(function() {
            compute();
            defer.resolve({
                url: _url,
                time: delay
            });
        }, delay);
        return defer.promise;
    }

    // when we reference scope variables, use vm since we use controller as syntax, otherwise it does not work as expected
    // we only use $scope when do $apply
    function processResults(vm, $scope) {
        console.log(vm.firstResult);
        console.log(vm.secondResult);
        $scope.$apply(function() {
            if (vm.firstResult && vm.secondResult) {
                vm.finalResult = (vm.firstResult * vm.secondResult);
                console.info(vm.finalResult);
                vm.firstResult = vm.secondResult = undefined;
            }
        });
    }
})();
