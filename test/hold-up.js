'use strict';

const {
    test,
    stub,
} = require('supertape');

const tryToCatch = require('try-to-catch');
const holdUp = require('..');

test('hold-up: no args', async (t) => {
    const [e] = await tryToCatch(holdUp);
    
    t.equal(e.message, 'fn should be a function or an array!', 'should reject when no fn');
    t.end();
});

test('hold-up: no options', async (t) => {
    const fn = stub().resolves();
    const [e] = await tryToCatch(holdUp, fn, null);
    
    t.equal(e.message, 'options should be an object!', 'should reject when options not object');
    t.end();
});

test('hold-up: options: not an object', async (t) => {
    const fn = stub().resolves();
    const [e] = await tryToCatch(holdUp, fn, null);
    
    t.equal(e.message, 'options should be an object!', 'should reject when options not object');
    t.end();
});

test('hold-up: throw', async (t) => {
    const log = stub();
    const fn = stub().rejects(Error('hello'));
    
    const [e] = await tryToCatch(holdUp, fn, {
        log,
        count: 1,
    });
    
    t.equal(e.message, 'hello');
    t.end();
});

test('hold-up: fn: arguments', async (t) => {
    const log = stub();
    const fn = async (a, b) => {
        throw Error(`${a}-${b}`);
    };
    
    const [e] = await tryToCatch(holdUp, [fn, 'hello', 'world'], {
        log,
        count: 1,
    });
    
    t.equal(e.message, 'hello-world');
    t.end();
});

test('hold-up: fn: return result', async (t) => {
    const fn = stub().resolves('hello');
    
    const result = await holdUp([fn]);
    
    t.equal(result, 'hello');
    t.end();
});

test('hold-up: call log', async (t) => {
    const log = stub();
    const fn = stub().rejects(Error('hello'));
    
    await tryToCatch(holdUp, fn, {
        log,
        count: 2,
        time: 1,
    });
    
    t.calledWith(log, [`1 attempts left`], 'should call log');
    t.end();
});

test('hold-up: not call log', async (t) => {
    const log = stub();
    const fn = stub().resolves();
    
    await tryToCatch(holdUp, fn, {
        log,
        count: 2,
        time: 1,
    });
    
    t.notOk(log.called, 'should not call log');
    t.end();
});

test('hold-up: not use options', async (t) => {
    const log = stub();
    const fn = async (a) => {
        throw a;
    };
    
    const {setTimeout} = global;
    global.setTimeout = (fn) => setTimeout(fn, 1);
    
    await tryToCatch(holdUp, [fn, 'hello']);
    
    global.setTimeout = setTimeout;
    
    t.notOk(log.called, 'should not use options');
    t.end();
});

