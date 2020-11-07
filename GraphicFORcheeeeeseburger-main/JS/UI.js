function UI (options) {
    var callbacks = options.callbacks || {};
    var input = document.getElementById('func');
    input.addEventListener('keyup', keyup);

    function keyup() {
        try {
            var f;
            eval (`f = function(x) { return ${ this.value};}`);
            callbacks.enterFunction(f);
        } catch (e) {
            console.log(e);
        }
    }
}