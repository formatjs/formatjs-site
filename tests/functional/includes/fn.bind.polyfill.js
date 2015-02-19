// Needed for PhantomJS < 2.0

if (!Function.prototype.bind) {
    var Empty = function () {};

    Function.prototype.bind = function bind(that) { // .length is 1
        var target = this;

        if (typeof target != 'function') {
            throw new TypeError('Function.prototype.bind called on incompatible ' + target);
        }

        var args = Array.prototype.slice.call(arguments, 1);

        var binder = function() {
            if (this instanceof bound) {
                var result = target.apply(
                    this,
                    args.concat(Array.prototype.slice.call(arguments))
                );
                if (Object(result) === result) {
                    return result;
                }
                return this;
            } else {
                return target.apply(
                    that,
                    args.concat(Array.prototype.slice.call(arguments))
                );
            }
        };

        var boundLength = Math.max(0, target.length - args.length);
        var boundArgs = [];

        for (var i = 0; i < boundLength; i++) {
            boundArgs.push('$' + i);
        }

        var bound = Function('binder', 'return function(' + boundArgs.join(',') + '){return binder.apply(this,arguments)}')(binder);

        if (target.prototype) {
            Empty.prototype = target.prototype;
            bound.prototype = new Empty();
            // Clean up dangling references.
            Empty.prototype = null;
        }

        return bound;
    };
}