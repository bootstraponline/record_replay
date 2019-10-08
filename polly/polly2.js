"use strict";

require("regenerator-runtime/runtime");

var _core = require("@pollyjs/core");

var _persisterFs = _interopRequireDefault(require("@pollyjs/persister-fs"));

var _adapterNodeHttp = _interopRequireDefault(require("@pollyjs/adapter-node-http"));

var _Chai = require("Chai");

var _crossFetch = require("cross-fetch");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/*
https://netflix.github.io/pollyjs/#/quick-start

1) First run generates Recorded ... message
2) HAR file is saved and replayed.
*/

/*
  Register the adapters and persisters we want to use. This way all future
  polly instances can access them by name.
*/
_core.Polly.register(_persisterFs["default"]);

_core.Polly.register(_adapterNodeHttp["default"]);

describe('Simple Example', function () {
  it('fetches a post',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    var polly, response, post;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            /*
              Create a new polly instance.
               Connect Polly to fetch. By default, it will record any requests that it
              hasn't yet seen while replaying ones it has already recorded.
            */
            polly = new _core.Polly('Simple Example', {
              adapters: ['node-http'],
              persister: _persisterFs["default"],
              persisterOptions: {
                fs: {
                  recordingsDir: 'recordings'
                }
              },
              logging: true
            });
            polly.connectTo('node-http');
            _context.next = 4;
            return (0, _crossFetch.fetch)('https://jsonplaceholder.typicode.com/posts/1');

          case 4:
            response = _context.sent;
            _context.next = 7;
            return response.json();

          case 7:
            post = _context.sent;
            (0, _Chai.expect)(response.status).to.equal(200);
            (0, _Chai.expect)(post.id).to.equal(1);
            /*
              Calling `stop` will persist requests as well as disconnect from any
              connected adapters.
            */

            _context.next = 12;
            return polly.stop();

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
});
