'use strict';

const isFn = (a) => typeof a === 'function';

const {promisify} = require('util');
const tryToCatch = require('try-to-catch');
const defaultLog = () => {};

const wait = promisify((time, fn) => {
    setTimeout(fn, time);
});

const parseFn = (fn) => {
    if (isFn(fn))
        return [fn, []];
    
    return fn;
};

module.exports = async function holdUp(fnc, options = {}) {
    check(fnc, options);
    
    const [fn, ...args] = parseFn(fnc);
    
    const {
        count = 5,
        time = 1000,
        log = defaultLog,
    } = options;
    
    const [e, result] = await tryToCatch(fn, ...args);
    
    if (!e)
        return result;
    
    if (!count || count === 1)
        throw e;
    
    await wait(time);
    
    log(e.message, `let's try again...`);
    log(`${count - 1} attempts left`);
    
    return await holdUp([fn, ...args], {
        time,
        count: count - 1,
        log,
    });
};

function check(fn, options) {
    if (!options || typeof options !== 'object')
        throw Error('options should be an object!');
    
    if (!Array.isArray(fn) && typeof fn !== 'function')
        throw Error('fn should be a function or an array!');
}

