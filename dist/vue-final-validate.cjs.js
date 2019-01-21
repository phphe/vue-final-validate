/*!
 * vue-final-validate v0.0.0-beta
 * (c) 2017-present phphe <phphe@outlook.com>
 * Released under the MIT License.
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var promise = _interopDefault(require('core-js/library/fn/promise'));
var isArray = _interopDefault(require('core-js/library/fn/array/is-array'));
var from = _interopDefault(require('core-js/library/fn/array/from'));
var isIterable = _interopDefault(require('core-js/library/fn/is-iterable'));
var iterator = _interopDefault(require('core-js/library/fn/symbol/iterator'));
var symbol = _interopDefault(require('core-js/library/fn/symbol'));
var keys = _interopDefault(require('core-js/library/fn/object/keys'));
var values = _interopDefault(require('core-js/library/fn/object/values'));
var getOwnPropertyNames = _interopDefault(require('core-js/library/fn/object/get-own-property-names'));
var getIterator = _interopDefault(require('core-js/library/fn/get-iterator'));
var assign = _interopDefault(require('core-js/library/fn/object/assign'));
var defineProperty = _interopDefault(require('core-js/library/fn/object/define-property'));
require('core-js/modules/es6.array.find');
require('core-js/modules/es6.regexp.constructor');
require('core-js/modules/es6.function.name');
require('core-js/modules/es7.array.includes');
require('core-js/modules/es6.string.includes');
require('regenerator-runtime/runtime');
require('core-js/modules/web.dom.iterable');
require('core-js/modules/es6.regexp.replace');
var hp = require('helper-js');

var promise$1 = promise;

var isArray$1 = isArray;

function _arrayWithoutHoles(arr) {
  if (isArray$1(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  }
}

var from_1 = from;

var isIterable$1 = isIterable;

function _iterableToArray(iter) {
  if (isIterable$1(Object(iter)) || Object.prototype.toString.call(iter) === "[object Arguments]") return from_1(iter);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}

var iterator$1 = iterator;

var symbol$1 = symbol;

function _typeof2(obj) { if (typeof symbol$1 === "function" && typeof iterator$1 === "symbol") { _typeof2 = function _typeof2(obj) { return typeof obj; }; } else { _typeof2 = function _typeof2(obj) { return obj && typeof symbol$1 === "function" && obj.constructor === symbol$1 && obj !== symbol$1.prototype ? "symbol" : typeof obj; }; } return _typeof2(obj); }

function _typeof(obj) {
  if (typeof symbol$1 === "function" && _typeof2(iterator$1) === "symbol") {
    _typeof = function _typeof(obj) {
      return _typeof2(obj);
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof symbol$1 === "function" && obj.constructor === symbol$1 && obj !== symbol$1.prototype ? "symbol" : _typeof2(obj);
    };
  }

  return _typeof(obj);
}

var keys$1 = keys;

var values$1 = values;

var getOwnPropertyNames$1 = getOwnPropertyNames;

var getIterator$1 = getIterator;

var assign$1 = assign;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    promise$1.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new promise$1(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var defineProperty$1 = defineProperty;

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;

    defineProperty$1(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    defineProperty$1(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

var _marked =
/*#__PURE__*/
regeneratorRuntime.mark(iterateObjectWithoutDollarDash);
// todo add rule `range`
// todo add '$ignore'
// todo auto trim
// todo add if to rule

var VueFinalValidateField =
/*#__PURE__*/
function () {
  _createClass(VueFinalValidateField, null, [{
    key: "generateName",
    // static -------------
    // str to name
    value: function generateName(str) {
      return hp.snakeCase(str).replace(/_/g, ' ');
    }
  }, {
    key: "isEmpty",
    value: function isEmpty(value) {
      if (value == null) {
        // null or undefined
        return true;
      } else if (value.length != null) {
        // string or array
        return (value.trim ? value.trim() : value).length === 0;
      }
    }
  }, {
    key: "findParent",
    value: function findParent(field, handler) {
      var current = field;

      while (current) {
        if (handler(current)) {
          return current;
        }

        current = current.$parent;
      }
    }
  }, {
    key: "watchAsync",
    value: function watchAsync(vm, getter, handler, opt) {
      var destroies = [];
      var destroyMain;
      var value0, oldValue0;
      main();
      return destroy;

      function destroyExecs() {
        destroies.forEach(function (f) {
          return f();
        });
        destroies = [];
      }

      function destroy() {
        if (destroyMain) {
          destroyMain();
          destroyMain = null;
        }

        destroyExecs();
      }

      function exec(getter, opt) {
        var value;
        var first = true;
        var unwatch = vm.$watch(function () {
          return getter.call(vm, exec);
        }, function (value2) {
          value = value2;

          if (first) {
            first = false;
          } else {
            main();
          }
        }, {
          immediate: true,
          deep: opt && opt.deep
        });
        destroies.push(unwatch);
        return value;
      }

      function main() {
        var count = 0;

        if (destroyMain) {
          destroyMain();
          destroyMain = null;
        }

        destroyMain = vm.$watch(function () {
          destroyExecs();
          return getter.call(vm, exec);
        },
        /*#__PURE__*/
        function () {
          var _ref = _asyncToGenerator(
          /*#__PURE__*/
          regeneratorRuntime.mark(function _callee(result) {
            var localCount;
            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    localCount = count;
                    count++;
                    oldValue0 = value0;
                    _context.next = 5;
                    return result;

                  case 5:
                    value0 = _context.sent;

                    if (localCount === 0) {
                      if (opt && opt.immediate) {
                        handler.call(vm, value0, oldValue0);
                      }
                    } else {
                      handler.call(vm, value0, oldValue0);
                    }

                  case 7:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee, this);
          }));

          return function (_x) {
            return _ref.apply(this, arguments);
          };
        }(), {
          immediate: true
        });
      }
    } // do handler first, handler return getter

  }, {
    key: "doWatch",
    value: function doWatch(vm, handler) {
      var oldValue, unwatch;

      var update = function update() {
        var getter = handler.call(vm, oldValue);
        unwatch = vm.$watch(getter, function (value) {
          unwatch();
          oldValue = value;
          update();
        });
      };

      update();
      return function () {
        return unwatch && unwatch();
      };
    } // props --------------
    // $vm,
    // $globalConfig,
    // $parent,
    // $key,
    // $validation,
    // $name

  }]);

  // Function(value, indexOrKey, count, field)
  function VueFinalValidateField(vm, field, config, parent, key, validation) {
    _classCallCheck(this, VueFinalValidateField);

    _defineProperty(this, "$isParent", null);

    _defineProperty(this, "$empty", null);

    _defineProperty(this, "$required", null);

    _defineProperty(this, "$dirty", null);

    _defineProperty(this, "$valid", null);

    _defineProperty(this, "$validating", null);

    _defineProperty(this, "$inputting", false);

    _defineProperty(this, "_dirty", null);

    _defineProperty(this, "_valid", null);

    _defineProperty(this, "_validating", null);

    _defineProperty(this, "_inputting", false);

    _defineProperty(this, "_errors", []);

    _defineProperty(this, "$value", null);

    _defineProperty(this, "$deep", null);

    _defineProperty(this, "$default", cls.DEFAULT);

    _defineProperty(this, "_rules", {});

    _defineProperty(this, "_rulesForRequired", []);

    _defineProperty(this, "_rulesForValid", []);

    _defineProperty(this, "$children", null);

    _defineProperty(this, "$each", null);

    _defineProperty(this, "_baseUnwatches", []);

    _defineProperty(this, "_unwatches", []);

    _defineProperty(this, "$started", false);

    this.$vm = vm;
    this.$globalConfig = config;
    this.$parent = parent;
    this.$key = key;

    assign$1(this, field);

    if (key && this.$name == null) {
      this.$name = cls.generateName(key);
    }

    this.$validation = validation; // if no validation, assign methods and props of the validation instance to the inital validation object

    if (!validation) {
      validation = field;
      this.$validation = validation;

      for (var _key in this) {
        if (validation[_key] !== this[_key]) {
          this.$vm.$set(validation, _key, this[_key]);
        }
      }

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = getIterator$1(getOwnPropertyNames$1(cls.prototype)), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var _key2 = _step.value;

          if (_key2 === 'constructor') {
            continue;
          }

          if (validation[_key2] !== cls.prototype[_key2]) {
            this.$vm.$set(validation, _key2, cls.prototype[_key2]);
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
  } // base start ======================


  _createClass(VueFinalValidateField, [{
    key: "_baseStart",
    value: function _baseStart() {
      // watch to generate validation structure
      // watch and make _rules, _rulesForRequired, _rulesForValid
      this._watchForRules(); // watch and make $value, $empty


      this._watchForValue(); // watch and make $children, _collectedRules


      this._updateChildren();

      this._watchForEach(); // after children generated
      //


      this._watchForStatus();
    }
  }, {
    key: "_baseUnwatch",
    value: function _baseUnwatch() {
      this._baseUnwatches.forEach(function (f) {
        return f();
      });

      this._baseUnwatches = [];

      if (this.$children) {
        values$1(this.$children).forEach(function (c) {
          return c._baseUnwatch();
        });
      }
    } // base watch ===============

  }, {
    key: "_watchForEach",
    value: function _watchForEach() {
      var _this = this;

      // todo
      return;
      var unwatch = this.$vm.$watch(function () {
        if (_this.$each) {
          // with $each, mainly for array
          var children = {};

          if (_this.$value) {
            var count = 0;
            hp.forAll(_this.$value, function (value, indexOrKey) {
              var childField = _this.$each(value, indexOrKey, count, _this);

              children[indexOrKey] = childField;
              count++;
            });
          }

          return children;
        }
      }, function (children, old) {
        // todo
        if (old && old.children) {
          var newKeys = keys$1(children);

          var needDelete = keys$1(old.children).filter(function (key) {
            return !newKeys.includes(key);
          });

          needDelete.forEach(function (key) {
            _this.$delete(key);
          });
        }

        keys$1(children).forEach(function (key) {
          if (old && old.children && old.children[key]) {
            assign$1(old.children[key], children[key]);

            children[key] = old.children[key];
          } else {
            children[key] = new cls(_this.$vm, children[key], _this.$globalConfig, _this, key, _this.$validation);
            children[key]._notBaseStarted = true;

            _this.$vm.$set(_this, key, children[key]);
          }
        });

        old = getterResult;

        _this.$vm.$set(_this, '_collectedRules', rules);

        _this.$children = keys$1(children).length > 0 ? children : null;

        values$1(children).forEach(function (c) {
          if (c._notBaseStarted) {
            c._baseStart();
          }
        });

        if (_this.$validation.$started) {
          values$1(children).forEach(function (c) {
            if (!c.$started) {
              c.start();
            }
          });
        }
      }, {
        immediate: true
      });
    }
  }, {
    key: "_updateChildren",
    value: function _updateChildren() {
      if (this.$each) {
        this.$isParent = true;
      } else if (!this.$each && (this.$isParent || this === this.$validation || this.$rules)) {
        // with $each is updated by watcher
        // validation or with `$rules`
        this.$isParent = true;
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = getIterator$1(iterateObjectWithoutDollarDash(this)), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var _ref3 = _step2.value;
            var key = _ref3.key,
                value = _ref3.value;
            this.$add(key, value);
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
              _iterator2.return();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }
      }
    }
  }, {
    key: "_watchForValue",
    value: function _watchForValue() {
      var _this2 = this;

      var unwatch = this.$vm.$watch(function () {
        var value;

        if (_this2.$valueGetter) {
          value = _this2.$valueGetter(_this2);
        } else {
          var t = cls.findParent(_this2, function (field) {
            return field.$childValueGetter;
          });
          var childValueGetter = t ? t.$childValueGetter : _this2.$globalConfig.childValueGetter;

          if (childValueGetter) {
            value = childValueGetter(_this2);
          } else {
            if (_this2 === _this2.$validation) {
              value = _this2.$vm.$data; // must use vm.$data; use `vm` will get error `Maximum call stack size exceeded`
            } else {
              value = _this2.$parent.$value && _this2.$parent.$value[_this2.$key];
            }
          }
        }

        return value;
      }, function (value) {
        _this2.$value = value;
        _this2.$empty = cls.isEmpty(value);
      }, {
        immediate: true
      });

      this._baseUnwatches.push(unwatch);
    }
  }, {
    key: "_watchForRules",
    value: function _watchForRules() {
      var _this3 = this;

      var unwatch = this.$vm.$watch(function () {
        var rulesForRequired = [];
        var rulesForValid = [];
        var rules;

        if (_this3.$each || _this3.$rules || _this3 === _this3.$validation) {
          rules = _this3.$rules || {};
        } else {
          // end field
          rules = {};
          var _iteratorNormalCompletion3 = true;
          var _didIteratorError3 = false;
          var _iteratorError3 = undefined;

          try {
            for (var _iterator3 = getIterator$1(iterateObjectWithoutDollarDash(_this3)), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
              var _ref5 = _step3.value;
              var key = _ref5.key,
                  value = _ref5.value;
              rules[key] = value;
            }
          } catch (err) {
            _didIteratorError3 = true;
            _iteratorError3 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
                _iterator3.return();
              }
            } finally {
              if (_didIteratorError3) {
                throw _iteratorError3;
              }
            }
          }
        }

        var _loop = function _loop(name) {
          var ruleInfo = rules[name];

          if (!hp.isObject(ruleInfo)) {
            ruleInfo = {
              params: hp.isArray(ruleInfo) ? ruleInfo : [ruleInfo]
            };
          } // resolve type


          var type = 'valid';

          if (ruleInfo.hasOwnProperty('type')) {
            type = ruleInfo.type;
          } else if (_this3.$globalConfig.rules[name]) {
            type = _this3.$globalConfig.rules[name].type;
          }

          var wrappedRule = {
            name: name,
            params: ruleInfo.params,
            type: type,
            handler: function handler(exec) {
              var ruleHandler = ruleInfo.handler || _this3.$globalConfig.rules[name] && _this3.$globalConfig.rules[name].handler;

              if (!ruleHandler) {
                var e = new Error("No handler found for rule '".concat(name, "' in field ").concat(_this3.$name, "."));
                e.name = 'no_handler';
                throw e;
              }

              var onSystemError = function onSystemError(e) {
                console.warn("System error when validate field '".concat(_this3.$name, "' rule '").concat(name, "'."), e);
                var systemErrorMessage = _this3.$globalConfig.systemErrorMessage;
                return {
                  validateResult: false,
                  error: e,
                  message: systemErrorMessage
                };
              };

              try {
                var ruleReturn = ruleHandler(_this3.$value, ruleInfo.params, _this3, exec);

                if (hp.isPromise(ruleReturn)) {
                  return ruleReturn.catch(function (e) {
                    return onSystemError(e);
                  });
                } else {
                  return ruleReturn;
                }
              } catch (e) {
                return onSystemError(e);
              }
            },
            message: function () {
              var _message = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee3(ruleReturn) {
                var resolveMessage, messageTpl, message, i, param, reg;
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        // convert message to str from str, function, null
                        resolveMessage =
                        /*#__PURE__*/
                        function () {
                          var _ref6 = _asyncToGenerator(
                          /*#__PURE__*/
                          regeneratorRuntime.mark(function _callee2(message) {
                            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                              while (1) {
                                switch (_context2.prev = _context2.next) {
                                  case 0:
                                    if (!hp.isFunction(message)) {
                                      _context2.next = 4;
                                      break;
                                    }

                                    _context2.next = 3;
                                    return message(_this3.$value, ruleInfo.params, _this3, ruleReturn);

                                  case 3:
                                    message = _context2.sent;

                                  case 4:
                                    return _context2.abrupt("return", message);

                                  case 5:
                                  case "end":
                                    return _context2.stop();
                                }
                              }
                            }, _callee2, this);
                          }));

                          return function resolveMessage(_x3) {
                            return _ref6.apply(this, arguments);
                          };
                        }(); //
                        // get message from config


                        messageTpl = ruleInfo.message || _this3.$globalConfig.rules[name] && _this3.$globalConfig.rules[name].message;

                        if (!messageTpl) {
                          // get message from parent defaultMessage
                          messageTpl = _this3.$globalConfig.defaultMessage;
                        } // compile message


                        _context3.next = 5;
                        return resolveMessage(messageTpl);

                      case 5:
                        messageTpl = _context3.sent;
                        message = messageTpl.replace(/:name/g, _this3.$name).replace(/:value/g, _this3.$value);

                        if (ruleInfo.params) {
                          for (i = 0; i < ruleInfo.params.length; i++) {
                            param = ruleInfo.params[i];
                            reg = new RegExp(':params\\[' + i + '\\]', 'g');
                            message = message.replace(reg, param);
                          }
                        }

                        return _context3.abrupt("return", message);

                      case 9:
                      case "end":
                        return _context3.stop();
                    }
                  }
                }, _callee3, this);
              }));

              function message(_x2) {
                return _message.apply(this, arguments);
              }

              return message;
            }()
          };

          if (wrappedRule.type === 'required') {
            rulesForRequired.push(wrappedRule);
          } else {
            rulesForValid.push(wrappedRule);
          }

          rules[name] = wrappedRule;
        };

        for (var name in rules) {
          _loop(name);
        }

        return {
          required: rulesForRequired,
          valid: rulesForValid,
          rules: rules
        };
      }, function (result) {
        if (!result) {
          _this3._rules = {};
          _this3._rulesForRequired = [];
          _this3._rulesForValid = [];
        } else {
          _this3._rules = result.rules;
          _this3._rulesForRequired = result.required;
          _this3._rulesForValid = result.valid;
        }
      }, {
        immediate: true
      });

      this._baseUnwatches.push(unwatch);
    } // start =====================

  }, {
    key: "$start",
    value: function $start() {
      if (this.$started) {
        return;
      }

      if (this.$children) {
        values$1(this.$children).forEach(function (childField) {
          childField.$start();
        });
      }

      this._watchForStatus();

      this._watchForValidate();

      this.$started = true;
    }
  }, {
    key: "$stop",
    value: function $stop() {
      this._unwatches.forEach(function (f) {
        return f();
      });

      this._unwatches = [];

      values$1(this.$children).forEach(function (c) {
        return c.$stop();
      });

      this.$started = false;
    } // advanced watch ===============
    // watch and auto update `dirty`, `inputting`, `valid`, `validating`

  }, {
    key: "_watchForStatus",
    value: function _watchForStatus() {
      var _this4 = this;

      var unwatch; // computed status: $dirty, $inputting, $valid, $validating

      unwatch = this.$vm.$watch(function () {
        return _this4._dirty || _this4.$children && values$1(_this4.$children).find(function (c) {
          return c.$dirty;
        });
      }, function (value) {
        _this4.$dirty = Boolean(value);
      }, {
        immediate: true
      });

      this._unwatches.push(unwatch);

      unwatch = this.$vm.$watch(function () {
        return _this4._inputting || _this4.$children && values$1(_this4.$children).find(function (c) {
          return c.$inputting;
        });
      }, function (value) {
        _this4.$inputting = Boolean(value);
      }, {
        immediate: true
      });

      this._unwatches.push(unwatch);

      unwatch = this.$vm.$watch(function () {
        return _this4._validating || _this4.$children && values$1(_this4.$children).find(function (c) {
          return c.$validating;
        });
      }, function (value) {
        _this4.$validating = Boolean(value);
      }, {
        immediate: true
      });

      this._unwatches.push(unwatch);

      unwatch = this.$vm.$watch(function () {
        return _this4._valid && (!_this4.$children || values$1(_this4.$children).every(function (c) {
          return c.$valid;
        }));
      }, function (value) {
        _this4.$valid = Boolean(value);
      }, {
        immediate: true
      });

      this._unwatches.push(unwatch); // self status: _dirty _inputting


      unwatch = this.$vm.$watch(function () {
        return _this4.$value;
      }, function () {
        if (cls._lastUserInputAt) {
          var nowTime = new Date().getTime();

          if (nowTime - cls._lastUserInputAt < 100) {
            var setDirty = function setDirty() {
              _this4._inputtingTimer = null;
              _this4._inputting = false;
              _this4._dirty = true;

              if (_this4.$started) {
                if (_this4.$default !== cls.DEFAULT && _this4.$value === _this4.$default) {
                  // equal $default
                  _this4._dirty = false;
                }
              }
            };

            if (!_this4.$globalConfig.inputtingDuration) {
              setDirty();
            } else {
              _this4._inputting = true;

              if (_this4._inputtingTimer) {
                clearTimeout(_this4._inputtingTimer);
                _this4._inputtingTimer = null;
              }

              _this4._inputtingTimer = setTimeout(setDirty, _this4.$globalConfig.inputtingDuration);
            }
          }
        }
      }, {
        immediate: true,
        deep: this.$deep
      });

      this._unwatches.push(unwatch);
    } // watch and auto update `$required`, `_valid`, `_validating`, `_errors`

  }, {
    key: "_watchForValidate",
    value: function _watchForValidate() {
      var _this5 = this;

      var validateId = -1;
      var unwatch = cls.watchAsync(this.$vm,
      /*#__PURE__*/
      function () {
        var _ref7 = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee4(exec) {
          var id, rules, rulesRequired, rulesValid, required, valid, reasons, _loop2, i, _ret, _iteratorNormalCompletion4, _didIteratorError4, _iteratorError4, _loop3, _iterator4, _step4, _ret2;

          return regeneratorRuntime.wrap(function _callee4$(_context6) {
            while (1) {
              switch (_context6.prev = _context6.next) {
                case 0:
                  validateId++;
                  id = validateId;
                  rules = _this5._rules;
                  rulesRequired = _this5._rulesForRequired;
                  rulesValid = _this5._rulesForValid;
                  required = false;
                  valid = true;
                  reasons = [];
                  exec(function () {
                    return _this5.$inputting;
                  });

                  if (!_this5.$inputting) {
                    _context6.next = 11;
                    break;
                  }

                  return _context6.abrupt("return", {
                    inputting: true
                  });

                case 11:
                  // observe $value
                  exec(function () {
                    return _this5.$value;
                  }, {
                    deep: _this5.$deep
                  });
                  _this5._validating = true; // check required

                  _loop2 =
                  /*#__PURE__*/
                  regeneratorRuntime.mark(function _loop2(i) {
                    var rule, t, ruleReturn;
                    return regeneratorRuntime.wrap(function _loop2$(_context4) {
                      while (1) {
                        switch (_context4.prev = _context4.next) {
                          case 0:
                            rule = rulesRequired[i];
                            exec(function () {
                              return rule.handler;
                            });
                            t = rule.handler(exec);

                            if (hp.isPromise(t) && _this5.$globalConfig.timeout) {
                              t = promiseTimeout(t, _this5.$globalConfig.timeout);
                            }

                            _context4.next = 6;
                            return t;

                          case 6:
                            ruleReturn = _context4.sent;

                            if (!(id !== validateId)) {
                              _context4.next = 9;
                              break;
                            }

                            return _context4.abrupt("return", {
                              v: {
                                expired: true
                              }
                            });

                          case 9:
                            if (ruleReturn || ruleReturn.validateResult) {
                              required = true;
                            }

                            if (!(i === rulesRequired.length - 1)) {
                              _context4.next = 18;
                              break;
                            }

                            // last rule
                            exec(function () {
                              return _this5.$empty;
                            });

                            if (!(required && _this5.$empty)) {
                              _context4.next = 18;
                              break;
                            }

                            valid = false;
                            reasons.push({
                              ruleReturn: ruleReturn,
                              rule: rule
                            });
                            exec(function () {
                              return _this5.$globalConfig.bail;
                            });

                            if (!_this5.$globalConfig.bail) {
                              _context4.next = 18;
                              break;
                            }

                            return _context4.abrupt("return", {
                              v: {
                                required: required,
                                valid: valid,
                                reasons: reasons,
                                id: id
                              }
                            });

                          case 18:
                          case "end":
                            return _context4.stop();
                        }
                      }
                    }, _loop2, this);
                  });
                  i = 0;

                case 15:
                  if (!(i < rulesRequired.length)) {
                    _context6.next = 23;
                    break;
                  }

                  return _context6.delegateYield(_loop2(i), "t0", 17);

                case 17:
                  _ret = _context6.t0;

                  if (!(_typeof(_ret) === "object")) {
                    _context6.next = 20;
                    break;
                  }

                  return _context6.abrupt("return", _ret.v);

                case 20:
                  i++;
                  _context6.next = 15;
                  break;

                case 23:
                  exec(function () {
                    return _this5._dirty;
                  });

                  if (_this5._dirty) {
                    _context6.next = 26;
                    break;
                  }

                  return _context6.abrupt("return", {
                    required: required,
                    valid: valid,
                    reasons: reasons,
                    id: id
                  });

                case 26:
                  // check valid
                  _iteratorNormalCompletion4 = true;
                  _didIteratorError4 = false;
                  _iteratorError4 = undefined;
                  _context6.prev = 29;
                  _loop3 =
                  /*#__PURE__*/
                  regeneratorRuntime.mark(function _loop3() {
                    var rule, t, ruleReturn;
                    return regeneratorRuntime.wrap(function _loop3$(_context5) {
                      while (1) {
                        switch (_context5.prev = _context5.next) {
                          case 0:
                            rule = _step4.value;
                            exec(function () {
                              return rule.handler;
                            });
                            t = rule.handler(exec);

                            if (hp.isPromise(t) && _this5.$globalConfig.timeout) {
                              t = promiseTimeout(t, _this5.$globalConfig.timeout);
                            }

                            _context5.next = 6;
                            return t;

                          case 6:
                            ruleReturn = _context5.sent;

                            if (!(id !== validateId)) {
                              _context5.next = 9;
                              break;
                            }

                            return _context5.abrupt("return", {
                              v: {
                                expired: true
                              }
                            });

                          case 9:
                            if (!(!ruleReturn || ruleReturn.hasOwnProperty('validateResult') && !ruleReturn.validateResult)) {
                              _context5.next = 15;
                              break;
                            }

                            valid = false;
                            reasons.push({
                              ruleReturn: ruleReturn,
                              rule: rule
                            });
                            exec(function () {
                              return _this5.$globalConfig.bail;
                            });

                            if (!_this5.$globalConfig.bail) {
                              _context5.next = 15;
                              break;
                            }

                            return _context5.abrupt("return", {
                              v: {
                                required: required,
                                valid: valid,
                                reasons: reasons,
                                id: id
                              }
                            });

                          case 15:
                          case "end":
                            return _context5.stop();
                        }
                      }
                    }, _loop3, this);
                  });
                  _iterator4 = getIterator$1(rulesValid);

                case 32:
                  if (_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done) {
                    _context6.next = 40;
                    break;
                  }

                  return _context6.delegateYield(_loop3(), "t1", 34);

                case 34:
                  _ret2 = _context6.t1;

                  if (!(_typeof(_ret2) === "object")) {
                    _context6.next = 37;
                    break;
                  }

                  return _context6.abrupt("return", _ret2.v);

                case 37:
                  _iteratorNormalCompletion4 = true;
                  _context6.next = 32;
                  break;

                case 40:
                  _context6.next = 46;
                  break;

                case 42:
                  _context6.prev = 42;
                  _context6.t2 = _context6["catch"](29);
                  _didIteratorError4 = true;
                  _iteratorError4 = _context6.t2;

                case 46:
                  _context6.prev = 46;
                  _context6.prev = 47;

                  if (!_iteratorNormalCompletion4 && _iterator4.return != null) {
                    _iterator4.return();
                  }

                case 49:
                  _context6.prev = 49;

                  if (!_didIteratorError4) {
                    _context6.next = 52;
                    break;
                  }

                  throw _iteratorError4;

                case 52:
                  return _context6.finish(49);

                case 53:
                  return _context6.finish(46);

                case 54:
                  return _context6.abrupt("return", {
                    required: required,
                    valid: valid,
                    reasons: reasons,
                    id: id
                  });

                case 55:
                case "end":
                  return _context6.stop();
              }
            }
          }, _callee4, this, [[29, 42, 46, 54], [47,, 49, 53]]);
        }));

        return function (_x4) {
          return _ref7.apply(this, arguments);
        };
      }(),
      /*#__PURE__*/
      function () {
        var _ref8 = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee5(value, old) {
          var errors, _iteratorNormalCompletion5, _didIteratorError5, _iteratorError5, _iterator5, _step5, _ref10, ruleReturn, rule, message;

          return regeneratorRuntime.wrap(function _callee5$(_context7) {
            while (1) {
              switch (_context7.prev = _context7.next) {
                case 0:
                  if (!(value.inputting || value.expired)) {
                    _context7.next = 2;
                    break;
                  }

                  return _context7.abrupt("return");

                case 2:
                  _this5.$required = value.required;
                  _this5._valid = value.valid;
                  errors = [];
                  _iteratorNormalCompletion5 = true;
                  _didIteratorError5 = false;
                  _iteratorError5 = undefined;
                  _context7.prev = 8;
                  _iterator5 = getIterator$1(value.reasons);

                case 10:
                  if (_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done) {
                    _context7.next = 22;
                    break;
                  }

                  _ref10 = _step5.value;
                  ruleReturn = _ref10.ruleReturn, rule = _ref10.rule;
                  _context7.next = 15;
                  return rule.message(ruleReturn);

                case 15:
                  message = _context7.sent;

                  if (!(value.id !== validateId)) {
                    _context7.next = 18;
                    break;
                  }

                  return _context7.abrupt("return");

                case 18:
                  errors.push({
                    field: _this5,
                    ruleName: rule.name,
                    message: message
                  });

                case 19:
                  _iteratorNormalCompletion5 = true;
                  _context7.next = 10;
                  break;

                case 22:
                  _context7.next = 28;
                  break;

                case 24:
                  _context7.prev = 24;
                  _context7.t0 = _context7["catch"](8);
                  _didIteratorError5 = true;
                  _iteratorError5 = _context7.t0;

                case 28:
                  _context7.prev = 28;
                  _context7.prev = 29;

                  if (!_iteratorNormalCompletion5 && _iterator5.return != null) {
                    _iterator5.return();
                  }

                case 31:
                  _context7.prev = 31;

                  if (!_didIteratorError5) {
                    _context7.next = 34;
                    break;
                  }

                  throw _iteratorError5;

                case 34:
                  return _context7.finish(31);

                case 35:
                  return _context7.finish(28);

                case 36:
                  _this5._errors = errors;
                  _this5._validating = false;

                case 38:
                case "end":
                  return _context7.stop();
              }
            }
          }, _callee5, this, [[8, 24, 28, 36], [29,, 31, 35]]);
        }));

        return function (_x5, _x6) {
          return _ref8.apply(this, arguments);
        };
      }(), {
        immediate: true
      });

      this._unwatches.push(unwatch);
    } // methods about errors ==================

  }, {
    key: "$getErrors",
    value: function $getErrors() {
      if (this.$children) {
        var r = [];

        values$1(this.$children).forEach(function (c) {
          r.push.apply(r, _toConsumableArray(c.$getErrors()));
        });

        return r;
      } else {
        return this._errors;
      }
    }
  }, {
    key: "$getFirstError",
    value: function $getFirstError() {
      if (this.$children) {
        var _arr = values$1(this.$children);

        for (var _i = 0; _i < _arr.length; _i++) {
          var c = _arr[_i];
          var r = c.$getFirstError();

          if (r) {
            return r;
          }
        }
      } else {
        return this._errors[0];
      }
    } // don't use add, delete with $each

  }, {
    key: "$add",
    value: function $add(key, field) {
      field = new cls(this.$vm, field, this.$globalConfig, this, key, this.$validation);
      this.$vm.$set(this, key, field);

      if (!this.$children) {
        this.$children = {};
      }

      this.$vm.$set(this.$children, key, field);

      field._baseStart();

      if (this.$started) {
        field.$start();
      }

      return this;
    }
  }, {
    key: "$delete",
    value: function $delete(keyOrIndex) {
      var field = this[keyOrIndex];

      field._destroy();

      this.$vm.$delete(this, keyOrIndex);
      this.$vm.$delete(this.$children, keyOrIndex);
      return this;
    }
  }, {
    key: "_destroy",
    value: function _destroy() {
      this._baseUnwatch();

      this.$stop();
    }
  }, {
    key: "$setStatus",
    value: function $setStatus(name, value) {
      this["_".concat(name)] = value;

      if (this.$children) {
        values$1(this.$children).forEach(function (c) {
          return c.$setStatus(name, value);
        });
      }

      return this;
    }
  }, {
    key: "$setDirty",
    value: function $setDirty(dirty) {
      return this.$setStatus('dirty', dirty);
    }
  }, {
    key: "$trySubmit",
    value: function $trySubmit() {
      var _this6 = this;

      this.$setDirty(true);
      this.$setStatus('inputting', false);
      return new promise$1(function (resolve, reject) {
        var unwatch = _this6.$vm.$watch(function () {
          return _this6.$validating;
        }, function (validating) {
          // use setTimeout to delay immediate watch, else unwatch is not ready
          setTimeout(function () {
            if (!validating) {
              unwatch();

              if (_this6.$valid) {
                resolve(_this6);
              } else {
                var e = new Error('Invalid input.');
                e.name = 'invalid';
                reject(e);
              }
            }
          }, 0);
        }, {
          immediate: true
        });
      });
    }
  }]);

  return VueFinalValidateField;
}();

_defineProperty(VueFinalValidateField, "DEFAULT", '__DEFAULT__');

var cls = VueFinalValidateField;
function makeMountPoint(Vue) {
  var mountPointVm = new Vue({
    data: function data() {
      return {
        mountPoint: {}
      };
    }
  });
  return mountPointVm.mountPoint;
}
function getDefaultConfig() {
  return {
    defaultMessage: 'The :name is invalid.',
    systemErrorMessage: 'System error during verification.',
    rules: {},
    bail: true,
    // Stop running validation rules after the first validation failure.,
    inputtingDuration: 1000,
    timeout: 5000,
    // validate timeout, for async validate
    methodName: 'validate' // childValueGetter(filed)

  };
}
function makeValidateMethod(mountPoint, config) {
  assign$1(initValidation, config);

  return initValidation;

  function initValidation(validation, data) {
    if (data && !validation.hasOwnProperty('$valueGetter')) {
      validation.$valueGetter = function () {
        return data;
      };
    }

    new VueFinalValidateField(this, validation, initValidation);

    if (!mountPoint[this._uid]) {
      this.$set(mountPoint, this._uid, []);
    }

    mountPoint[this._uid].push(validation);

    validation._baseStart();

    validation.$start();
    return validation;
  }
} // listen user input events

function listenUserInput() {
  if (cls._listenUserInput) {
    return;
  }

  cls._listenUserInput = true;

  var handler = function handler() {
    cls._lastUserInputAt = new Date().getTime();
  };

  hp.onDOM(window, 'keydown', handler);
  hp.onDOM(window, 'mousedown', handler);
}
function install(Vue, config) {
  listenUserInput();
  var cfg = getDefaultConfig();

  if (config) {
    assign$1(cfg, config);
  }

  config = cfg;
  var name = config.methodName;
  var mountPoint = makeMountPoint(Vue);
  var validateMethod = Vue.prototype["$".concat(name)] = makeValidateMethod(mountPoint, cfg);
  Vue.mixin({
    beforeDestroy: function beforeDestroy() {
      // destroy validation of current vm
      if (mountPoint[this._uid]) {
        mountPoint[this._uid].forEach(function (validation) {
          validation._baseUnwatch();
        });

        this.$delete(mountPoint, this._uid);
      }
    }
  });
  return validateMethod;
}

function promiseTimeout(promise$$1, timeout) {
  return new promise$1(function (resolve, reject) {
    var t, rejected;
    promise$$1.then(function () {
      clearTimeout(t);
      resolve.apply(void 0, arguments);
    }, function () {
      if (!rejected) {
        clearTimeout(t);
        reject.apply(void 0, arguments);
      }
    });
    t = setTimeout(function () {
      rejected = true;
      var e = new Error('Promise timeout!');
      e.name = 'timeout';
      reject(e);
    }, timeout);
  });
}

function iterateObjectWithoutDollarDash(obj) {
  var key, start;
  return regeneratorRuntime.wrap(function iterateObjectWithoutDollarDash$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.t0 = regeneratorRuntime.keys(obj);

        case 1:
          if ((_context8.t1 = _context8.t0()).done) {
            _context8.next = 9;
            break;
          }

          key = _context8.t1.value;
          start = key.substr(0, 1);

          if (!(start !== '$' && start !== '_')) {
            _context8.next = 7;
            break;
          }

          _context8.next = 7;
          return {
            key: key,
            value: obj[key]
          };

        case 7:
          _context8.next = 1;
          break;

        case 9:
        case "end":
          return _context8.stop();
      }
    }
  }, _marked, this);
}

exports.VueFinalValidateField = VueFinalValidateField;
exports.cls = cls;
exports.makeMountPoint = makeMountPoint;
exports.getDefaultConfig = getDefaultConfig;
exports.makeValidateMethod = makeValidateMethod;
exports.listenUserInput = listenUserInput;
exports.default = install;
