'use strict';                                   // eslint-disable-line strict

/** @file
 * This module re-writes the twiddle Algorithm
 */
class Twiddle {
    /**
     * Initialization
     * @param {Number} n - total number of objects
     * @param {Number} m - number of objects in each combinations
     */
    constructor(n, m) {
        if (!n || (n !== parseInt(n, 10)) || n <= 0) {
            throw Error('First parameter must be a positive integer');
        }
        if (!m || (m !== parseInt(m, 10)) || m <= 0) {
            throw Error('Second parameter must be a positive integer');
        }
        if (m > n) {
            throw Error('Second parameter must be <= the first parameter');
        }

        let i;
        this.m = m;
        this.n = n;
        this.p = [];
        this.p[0] = n + 1;
        for (i = 1; i !== n - m + 1; i++) {
            this.p[i] = 0;
        }
        while (i !== n + 1) {
            this.p[i] = i + m - n;
            i++;
        }
        this.p[n + 1] = -2;
        if (m === 0) {
            this.p[1] = 1;
        }
    }

    /**
     * Generate combinations
     * @param {Object} params - parameters
     * @return {Boolean} flag showing whether a correct combination is created
     */
    _run(params) {
        let i;
        let j = 1;
        let k;
        while (params.p[j] <= 0) {
            j++;
        }
        /* eslint-disable */
        if (params.p[j - 1] === 0) {
            for (i = j - 1; i !== 1; i--) {
                params.p[i] = -1;
            }
            params.p[j] = 0;
            params.x = 0;
            params.z = 0;
            params.p[1] = 1;
            params.y = j - 1;
        } else {
            if (j > 1) {
                params.p[j - 1] = 0;
            }
            j++;
            while (params.p[j] > 0) {
                j++;
            }
            k = j - 1;
            i = j;
            while (params.p[i] === 0) {
                params.p[i++] = -1;
            }
            if (params.p[i] === -1) {
                params.p[i] = params.p[k];
                params.z = params.p[k] - 1;
                params.x = i - 1;
                params.y = k - 1;
                params.p[k] = -1;
            } else {
                if (i === params.p[0]) {
                    return true;
                }
                params.p[j] = params.p[i];
                params.z = params.p[i] - 1;
                params.p[i] = 0;
                params.x = j - 1;
                params.y = i - 1;
            }
        }
        /* eslint-enable */
        return false;
    }

    /**
     * Generate and return all combinations
     * @param {Array} [input] - array of elements
     * @returns {Array} array of combinations
     */
    genAllCombs(input) {
        let res;
        let idx = 0;
        const output = [];
        if (input) {
            if (Array.isArray(input) && input.length === this.n) {
                res = input.slice(this.n - this.m);
            } else {
                throw Error(['Input parameter must be either undefined or an',
                    `arary of length ${this.n}`].join(' '));
            }
        } else {
            res = (new Array(this.n - this.m).fill(0)).concat(
                new Array(this.m).fill(1));
        }
        output[idx++] = res;
        const params = {
            x: 0,
            y: 0,
            z: 0,
            p: this.p.slice(),
        };
        while (!this._run(params)) {
            if (input) {
                res[params.z] = input[params.x];
            } else {
                res[params.x] = 1;
                res[params.y] = 0;
            }
            output[idx++] = res.slice();
        }
        return output;
    }

    /**
     * Init for iterating all combinations
     * @param {Array} [input] - array of elements
     * @returns {Object} input object for iterating all combinations
     */
    init(input) {
        let res;
        if (input) {
            if (Array.isArray(input) && input.length === this.n) {
                res = input.slice(this.n - this.m);
            } else {
                throw Error(['Input parameter must be either undefined or an',
                    `arary of length ${this.n}`].join(' '));
            }
        } else {
            res = (new Array(this.n - this.m).fill(0)).concat(
                new Array(this.m).fill(1));
        }
        const params = {
            x: 0,
            y: 0,
            z: 0,
            p: this.p.slice(),
            res,
            input,
        };
        return params;
    }

    /**
     * Iterate all combinations
     * @param {Object} params - input object for iterating all combinations
     * @returns {Array} every combination
     */
    iterate(params) {
        if (!this._run(params)) {
            if (params.input) {
                // eslint-disable-next-line
                params.res[params.z] = params.input[params.x];
            } else {
                params.res[params.x] = 1;               // eslint-disable-line
                params.res[params.y] = 0;               // eslint-disable-line
            }
            return params.res;
        }
        return undefined;
    }
}

module.exports = Twiddle;
