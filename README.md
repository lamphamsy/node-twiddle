# node-twiddle

Rewrite in NodeJS the Chase's Twiddle algorithm that returns all combinations
of `m` out of `n` objects.

The C implementation can be found
[here](http://dl.acm.org/citation.cfm?id=362502).

## API

### Import library

```javascript
const NodeTwiddle = require('node-twiddle');
```

### Initialization

```javascript
const twiddle = new NodeTwiddle(n, m);
```

where `n` is total number of objects, `m` is number of objects in each
combination.

### Generate and return all combinations

```javascript
twiddle.genAllCombs(input)
```

where `input` is an optional parameter for array of `n` objects. Hence, output
is all combination of `m` out of the `n` objects. If the input is not given,
output is an array of all sequences of 0's and 1's containing `m` 1's.

### Iterate each combination

Initialize parameters for iterating

```javascript
const params = twiddle.init(input)
```

The `input` parameter is optional as described above.

The 1st combination is `params.res`. Each next combination is iterated via

```javascript
twiddle.iterate(params)
```

If it returns `undefined`, the iteration ends.
