function Graph(options){
   var options = options || {};
    var id = options.id;
    var width = options.width || 300;
    var height = options.height || 300;
    var WINDOW = options.WINDOW || {};
    var callbacks = options.callbacks;
    var canvas;
    if(id){
        canvas = document.getElementById(id);
    } else {
        canvas = document.createElement('canvas');
        document.querySelector('body').appendChild(canvas);
    }
    canvas.width = width;
    canvas.height = height;
    var ctx = canvas.getContext('2d');
    canvas.addEventListener('wheel', callbacks.wheel);
    canvas.addEventListener('mouseup', callbacks.mouseup);
    canvas.addEventListener('mousedown', callbacks.mousedown);
    canvas.addEventListener('mousemove', callbacks.mousemove);
    canvas.addEventListener('mouseleave', callbacks.mouseleave);

    function xs(x){
        return (x - WINDOW.LEFT)/WINDOW.WIDTH * canvas.width;
    }

    function ys(y){
        return canvas.height - (y - WINDOW.BOTTOM)/WINDOW.HEIGHT * canvas.height;
    }

    this.sx = function (x){
        return x * WINDOW.WIDTH / canvas.width;
    }

    this.sy = function (y){
        return -y * WINDOW.HEIGHT / canvas.height;
    }

    this.clear = function(){
        ctx.fillStyle = '#d9d9d9';
        ctx.fillRect(0,0, canvas.width,canvas.height);
    }

    this.point = function(x,y,color,size){
        ctx.beginPath();
        ctx.strokeStyle = color || '#F00';
        ctx.arc(xs(x), ys(y), size || z, 0, 2 * Math.PI);
        ctx.stroke();
    } 

    this.line = function(x1,y1,x2,y2, color, width, isDash){
        ctx.beginPath();
        ctx.strokeStyle = color || 'black';
        ctx.lineWidth = width || 2;
        if (isDash) {
            ctx.setLineDash([10, 10]);
        } else {
            ctx.setLineDash([]);
        }
        ctx.moveTo(xs(x1), ys(y1));
        ctx.lineTo(xs(x2), ys(y2));
        ctx.stroke();
    }

    this.number = function(text, x, y, axis){
        if(axis == 'x'){
            ctx.fillStyle = "#F00";
            ctx.font = "italic 11pt Arial";
            ctx.fillText( text, xs(x - 0.25), ys(y - 0.7));
        } else if (axis == 'y'){
            ctx.fillStyle = "#F00";
            ctx.font = "italic 11pt Arial";
            ctx.fillText( text, xs(x - 0.7), ys(y - 0.15));
        } else {
            ctx.fillStyle = "#F00";
            ctx.font = "italic 11pt Arial";
            ctx.fillText( text, xs(x + 0.1), ys(y - 0.5));
        }  
    }

    this.printFuncNames = function (name, x, f, color) {
        ctx.fillStyle = color || 'F00';
            ctx.font = "italic 12pt Arial";
            y = f(x) + 1.5;
            ctx.fillText( name, xs(x), ys(y));
    }
    
}