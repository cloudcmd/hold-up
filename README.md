# Hold Up [![License][LicenseIMGURL]][LicenseURL] [![NPM version][NPMIMGURL]][NPMURL] [![Build Status][BuildStatusIMGURL]][BuildStatusURL] [![Coverage Status][CoverageIMGURL]][CoverageURL]

`hold up` is `setInterval` with `promises`, `counter` and `error handling`.
It runs a `function` and if `throws` run it again with interval (defaults to 1 second) `counter` times (defaults to 5). If it fails, promise rejects, if successed resolves.

## Install

`npm i @iocmd/hold-up --save`

## API

### holdUp(fn[, options])

### holdUp([fn, args], options)

- `fn` - function
- `args` - array of arguments
- `options` - options may contain:
  - `log`
  - `count`
  - `time`

```js
const holdUp = require('hold-up');
const fn = async (a = 'hello') => {
    throw Error(a);
};

await holdUp(fn);

// reject in a 5 seconds
// [Error: hello]

// with arguments
await holdUp([fn, 'world']);

// reject in a 5 seconds
//[Error: hello]

// when you need to override options,
await holdUp([fn, 'hello'], {
    count: 5,       // default
    time: 1000,     // default
    log: () => {},  // default
});
```

## Related

- [currify](https://github.com/coderaiser/currify "currify") - translate the evaluation of a function that takes multiple arguments into evaluating a sequence of functions, each with a single or more arguments.

- [fullstore](https://github.com/coderaiser/fullstore "fullstore") - functional variables.

- [wraptile](https://github.com/coderaiser/wraptile "wraptile") - translate the evaluation of a function that takes multiple arguments into evaluating a sequence of 2 functions, each with a any count of arguments.

## License

MIT

[NPMIMGURL]: https://img.shields.io/npm/v/@iocmd/hold-up.svg?style=flat
[BuildStatusIMGURL]: https://travis-ci.com/iocmd/hold-up.svg?branch=master
[LicenseIMGURL]: https://img.shields.io/badge/license-MIT-317BF9.svg?style=flat
[NPMURL]: https://npmjs.org/package/@iocmd/hold-up "npm"
[BuildStatusURL]: https://travis-ci.com/iocmd/hold-up "Build Status"
[LicenseURL]: https://tldrlegal.com/license/mit-license "MIT License"
[CoverageURL]: https://coveralls.io/github/iocmd/hold-up?branch=master
[CoverageIMGURL]: https://coveralls.io/repos/iocmd/hold-up/badge.svg?branch=master&service=github
