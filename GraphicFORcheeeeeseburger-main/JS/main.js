var graphs = [
    {
        f: function (x) {
            return x;
        },
        color: 'blue',
        width: 2,

    }
]

function sin(x) { return Math.sin(x); }
function cos(x) { return Math.cos(x); }
function tan(x) { return Math.tan(x); }
function sqrt(x) { return Math.sqrt(x); }
function abs(x) { return Math.abs(x); }
function log(x) { return Math.log(x); }
function pow(x) { return Math.pow(x, 2);}

window.onload = function () {
    var WINDOW = {
        LEFT: -10,
        BOTTOM: -10,
        WIDTH: 20,
        HEIGHT: 20
    };

    var graph = new Graph({ id: 'canvas', width: 800, height: 800, WINDOW: WINDOW, callbacks: { wheel, mouseup, mousedown, mousemove, mouseleave } });

    var ui = new UI({
        callbacks: { enterFunction }
    });

    function enterFunction(f) {
        graphs[0].f = f;
        render();
    }
    function printFunction(f, color, width) {
        var x = WINDOW.LEFT;
        var dx = WINDOW.WIDTH / 1000;
        while (x < WINDOW.WIDTH + WINDOW.LEFT) {
            try {
                graph.line(x, f(x), x + dx, f(x + dx), color, width);

            } catch (e) { };
            x += dx;
        }

    }

    var zoomStep = 2;
    var canScroll = false;

    function wheel(event) {
        var delta = (event.wheelDelta > 0) ? - zoomStep : zoomStep;
        if (WINDOW.WIDTH - zoomStep > 0) {
            WINDOW.WIDTH += delta;
            WINDOW.HEIGHT += delta;
            WINDOW.LEFT -= delta / 2;
            WINDOW.BOTTOM -= delta / 2;
        }
        render();
    }

    function mousedown() {
        canScroll = true;
    }
    function mouseup() {
        canScroll = false;
    }
    function mouseleave() {
        canScroll = false;
    }
    function mousemove(event) {
        if (canScroll) {
            WINDOW.LEFT -= graph.sx(event.movementX);
            WINDOW.BOTTOM -= graph.sy(event.movementY);
        }
        render();
    }

    function printOXY() {
        var size = 0.2;
        // Ox
        graph.line(WINDOW.LEFT, 0, WINDOW.WIDTH + WINDOW.LEFT, 0, 'red', 1);
        // Oy
        graph.line(0, WINDOW.BOTTOM, 0, WINDOW.HEIGHT + WINDOW.BOTTOM, 'red', 1);
        //асимптоты
        graph.line(5, WINDOW.BOTTOM, 5, WINDOW.HEIGHT + WINDOW.BOTTOM, 'red', 1, true);
        graph.line(-5, WINDOW.BOTTOM, -5, WINDOW.HEIGHT + WINDOW.BOTTOM, 'red', 1, true);
        // Ox >
        graph.line(WINDOW.WIDTH + WINDOW.LEFT, 0, WINDOW.WIDTH + WINDOW.LEFT - 1 / 2, size, 'red', 1);
        graph.line(WINDOW.WIDTH + WINDOW.LEFT, 0, WINDOW.WIDTH + WINDOW.LEFT - 1 / 2, -size, 'red', 1);
        // Oy >
        graph.line(0, WINDOW.HEIGHT + WINDOW.BOTTOM, +size, WINDOW.HEIGHT + WINDOW.BOTTOM - 1 / 2, 'red', 1);
        graph.line(0, WINDOW.HEIGHT + WINDOW.BOTTOM, -size, WINDOW.HEIGHT + WINDOW.BOTTOM - 1 / 2, 'red', 1);

        for (var i = 1; i < WINDOW.WIDTH + WINDOW.LEFT; i++) {
            graph.line(i, WINDOW.HEIGHT, i, WINDOW.BOTTOM, '#fab9b4', 1);
            if (i % 5 == 0) {
                graph.line(i, -size, i, size, 'red', 2);
            } else {
                graph.line(i, -size, i, size, 'red', 1);
            }

        }
        for (var i = -1; i > WINDOW.LEFT; i--) {
            graph.line(i, WINDOW.HEIGHT, i, WINDOW.BOTTOM, '#fab9b4', 1);
            if (i % -5 == 0) {
                graph.line(i, -size, i, size, 'red', 2);
            } else {
                graph.line(i, -size, i, size, 'red', 1);
            }

        }
        for (var i = 1; i < WINDOW.HEIGHT + WINDOW.BOTTOM; i++) {
            graph.line(WINDOW.LEFT, i, WINDOW.WIDTH, i, '#fab9b4', 1);
            if (i % 5 == 0) {
                graph.line(-size, i, size, i, 'red', 2);
            } else {
                graph.line(-size, i, size, i, 'red', 1);
            }

        }
        for (var i = -1; i > WINDOW.BOTTOM; i--) {
            graph.line(WINDOW.LEFT, i, WINDOW.WIDTH, i, '#fab9b4', 1);
            if (i % -5 == 0) {
                graph.line(-size, i, size, i, 'red', 2);
            } else {
                graph.line(-size, i, size, i, 'red', 1);
            }

        }
    }

    function printNumbers() {
        for (var i = 1; i < WINDOW.WIDTH + WINDOW.LEFT; i++) {
            graph.number(i, i, 0, 'x');
        }

        for (var i = 1; i < Math.abs(WINDOW.LEFT); i++) {
            graph.number(-i, -i, 0, 'x');
        }

        for (var i = 1; i < WINDOW.HEIGHT + WINDOW.BOTTOM; i++) {
            graph.number(i, 0, i, 'y');
        }

        for (var i = 1; i < Math.abs(WINDOW.BOTTOM); i++) {
            graph.number(-i, 0, -i, 'y');
        }
        graph.number('0', 0, 0, '0');
    }

    function getZero(f, a, b) {
        var c;
        var E = 0.001;
        while (Math.abs(f(a) - f(b)) >= E) {
            if (f(a) * f(b) > 0) {
                return false;
            }
            c = (a + b) / 2;
            if (f(a) * f(c) <= 0) {
                b = c;
                c = (a + b) / 2;
            }
            if (f(c) * f(b) <= 0) {
                a = c;
                c = (a + b) / 2;
            }
        }
        return a;
    }

    function render() {
        graph.clear();
        printOXY();
        for (var i = 0; i < graphs.length; i++) {
            printFunction(graphs[i].f, graphs[i].color, graphs[i].width);
        }
        printNumbers();
    }
    render();
}
