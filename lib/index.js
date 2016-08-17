'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.templateAsync = undefined;

var templateAsync = exports.templateAsync = function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(filePath, args) {
        var template;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return readFileAsync(filePath);

                    case 2:
                        template = _context.sent;
                        return _context.abrupt('return', _handlebars2.default.compile(template, {
                            noEscape: true
                        })(args));

                    case 4:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function templateAsync(_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();

exports.readFileAsync = readFileAsync;
exports.copyDirAsync = copyDirAsync;
exports.writeFileAsync = writeFileAsync;
exports.unlinkAsync = unlinkAsync;
exports.execAsync = execAsync;
exports.watchItr = watchItr;
exports.emptyDir = emptyDir;
exports.glob = glob;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _handlebars = require('handlebars');

var _handlebars2 = _interopRequireDefault(_handlebars);

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _child_process = require('child_process');

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _watch = require('watch');

var _watch2 = _interopRequireDefault(_watch);

var _glob = require('glob');

var _glob2 = _interopRequireDefault(_glob);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = [watchItr].map(regeneratorRuntime.mark);

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

function readFileAsync(filePath) {
    return new Promise(function (resolve, reject) {
        _fs2.default.readFile(filePath, 'utf-8', function (err, txt) {
            if (err) {
                reject(err);
            } else {
                resolve(txt);
            }
        });
    });
}

function copyDirAsync(src, dest) {
    var clobber = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];
    var filter = arguments[3];

    if (!filter) {
        filter = function filter() {
            return true;
        };
    }
    return new Promise(function (resolve, reject) {
        _fsExtra2.default.copy(src, dest, {
            clobber: clobber,
            filter: filter
        }, function (err) {
            if (err) {
                reject(err);
            }
            resolve();
        });
    });
}

function writeFileAsync(filePath, content) {
    return new Promise(function (resolve, reject) {
        _fs2.default.writeFile(filePath, content, function (err) {
            if (err) reject(err);
            resolve();
        });
    });
}

function unlinkAsync(filePath) {
    return new Promise(function (resolve, reject) {
        _fs2.default.unlink(filePath, function (err) {
            if (err) reject(err);
            resolve();
        });
    });
}

function execAsync(command) {
    return new Promise(function (resolve, reject) {
        (0, _child_process.exec)(command, function (err, stdout, stderr) {
            resolve({
                stdout: stdout,
                stderr: stderr,
                err: err
            });
        });
    });
}

function watchItr(src, options) {
    var resolver, p;
    return regeneratorRuntime.wrap(function watchItr$(_context2) {
        while (1) {
            switch (_context2.prev = _context2.next) {
                case 0:
                    resolver = {};

                    _watch2.default.watchTree(src, options, function (f, curr, prev) {
                        resolver.resolve(f);
                    });

                case 2:
                    if (!true) {
                        _context2.next = 8;
                        break;
                    }

                    p = new Promise(function (resolve, reject) {
                        resolver.resolve = resolve;
                    });
                    _context2.next = 6;
                    return p;

                case 6:
                    _context2.next = 2;
                    break;

                case 8:
                case 'end':
                    return _context2.stop();
            }
        }
    }, _marked[0], this);
}

function emptyDir(src) {
    return new Promise(function (resolve, reject) {
        _fsExtra2.default.emptyDir(src, function (err) {
            if (err) {
                reject(err);
            }
            resolve();
        });
    });
}

function glob(globRegex) {
    return new Promise(function (resolve, reject) {
        (0, _glob2.default)(globRegex, function (err, files) {
            if (err) reject(err);
            resolve(files);
        });
    });
}
