onmessage = function(e) {
    var workerResult = compute();
    postMessage(workerResult);
}

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
