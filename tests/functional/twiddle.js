'use strict';                                   // eslint-disable-line strict

const Twiddle = require('../../lib/twiddle');

const N = 6;
const M = 2;
const twiddle = new Twiddle(N, M);

describe(`Twiddle: return all combs with (N = ${N}, M = ${M})`, function cb() {
    this.timeout(0);

    it('Gen all combinations of 0s and 1s', () => {
        const res = twiddle.genAllCombs();
        process.stdout.write('All combinations:');
        process.stdout.write(JSON.stringify(res));
    });

    it('Gen all combinations of objects', () => {
        const objs = ['a', 'b', 'c', 'd', 'e', 'f'];
        const res = twiddle.genAllCombs(objs);
        process.stdout.write('All combinations:');
        process.stdout.write(JSON.stringify(res));
    });
});

describe(`Twiddle: iterate combs with (N = ${N}, M = ${M})`, function cb() {
    this.timeout(0);

    function show(idx, res) {
        process.stdout.write(`\n${idx}: `);
        process.stdout.write(JSON.stringify(res));
    }

    it('Iterate combinations 0s and 1s', () => {
        const params = twiddle.init();
        let res;
        let idx = 0;
        // first combination
        show(idx++, params.res);
        // eslint-disable-next-line
        while ((res = twiddle.iterate(params)) !== undefined) {
            show(idx++, res);
        }
    });

    it('Gen all combinations of objects', () => {
        const objs = ['a', 'b', 'c', 'd', 'e', 'f'];
        const params = twiddle.init(objs);
        let res;
        let idx = 0;
        // first combination
        show(idx++, params.res);
        // eslint-disable-next-line
        while ((res = twiddle.iterate(params)) !== undefined) {
            show(idx++, res);
        }
    });
});
