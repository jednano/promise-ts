#promise-ts

[![Build Status][]](https://travis-ci.org/jedmao/promise-ts)
[![Dependency Status][]](https://gemnasium.com/jedmao/promise-ts)
[![NPM version][]](http://badge.fury.io/js/promise-ts)
[![Views][]](https://sourcegraph.com/github.com/jedmao/promise-ts)

[![NPM](https://nodei.co/npm/promise-ts.png?downloads=true)](https://nodei.co/npm/promise-ts/)

Promises for Node.js, written in TypeScript and distributed in JavaScript, along
with a TypeScript definition file at the root (promise.d.ts). These promise classes
and functions "mostly" behave like jQuery promises, so you can refer to
[jQuery documentation][] for more detailed information.

The following classes and function are made available to you:

1. Deferred object ([jQuery doc](http://api.jquery.com/jQuery.Deferred/))
1. Promise object ([jQuery doc](http://api.jquery.com/Types/#Promise))
1. when function ([jQuery doc](http://api.jquery.com/jQuery.when/))

The only known differences between the jQuery counterparts are in cases like
[jQuery's deferred.done][], where the documentation states, "The `deferred.done()`
method accepts one or more arguments, all of which can be either a single function
or an array of functions." In this library's case, it's just a TypeScript
`(...callbacks: Function[])` method signature. Contributions are welcome to fix
this, but I didn't have the need to go down that road myself.


## Example Usage

### TypeScript

```ts
///<reference path='node_modules/promise-ts/promise-ts.d.ts'/>
import promise = require('promise-ts');
var Deferred = promise.Deferred;
var when = promise.when; // not used in this example, but handy.

function doSomethingAsync(): promise.Promise {
    var d = new Deferred();
    setTimeout(() => {
        // time consuming operations
        d.resolve('foo');
    });
    return d.promise;
}

doSomethingAsync.done(result => {
    // result === 'foo';
});
```

### JavaScript

```js
var promise = require('promise-ts');
var Deferred = promise.Deferred;
var when = promise.when; // not used in this example, but handy.

function doSomethingAsync() {
    var d = new Deferred();
    setTimeout(function() {
        // time consuming operations
        d.resolve('foo');
    });
    return d.promise;
}

doSomethingAsync.done(function(result) {
    // result === 'foo';
});
```

See [the specs][] for more examples. The library and specs have both been written
to satisfy the jQuery usages.


## License

MIT © [Jed Mao](https://github.com/jedmao)


[Build Status]: https://travis-ci.org/jedmao/promise-ts.png?branch=master
[Dependency Status]: https://gemnasium.com/jedmao/promise-ts.png
[NPM Version]: https://badge.fury.io/js/promise-ts.png
[Views]: https://sourcegraph.com/api/repos/github.com/jedmao/promise-ts/counters/views-24h.png
[jQuery documentation]: http://api.jquery.com/category/deferred-object/
[jQuery's deferred.done]: http://api.jquery.com/deferred.done/
[the specs]: blob/master/test/lib/promises.ts


[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/jedmao/promise-ts/trend.png)](https://bitdeli.com/free "Bitdeli Badge")

