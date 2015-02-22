onmessage = function(e) {
    for (var i = 0; i < 10; i++) {
        compute();
    }
}

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
