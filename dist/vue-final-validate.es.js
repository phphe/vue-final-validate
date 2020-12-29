/*!
 * vue-final-validate v1.0.6
 * (c) 2017-present phphe <phphe@outlook.com>
 * Released under the MIT License.
 */
import promise from 'core-js/library/fn/promise';
import isArray from 'core-js/library/fn/array/is-array';
import from from 'core-js/library/fn/array/from';
import isIterable from 'core-js/library/fn/is-iterable';
import iterator from 'core-js/library/fn/symbol/iterator';
import symbol from 'core-js/library/fn/symbol';
import keys from 'core-js/library/fn/object/keys';
import values from 'core-js/library/fn/object/values';
import getOwnPropertyNames from 'core-js/library/fn/object/get-own-property-names';
import getIterator from 'core-js/library/fn/get-iterator';
import assign from 'core-js/library/fn/object/assign';
import defineProperty from 'core-js/library/fn/object/define-property';
import 'core-js/modules/es6.regexp.constructor';
import 'core-js/modules/es6.regexp.to-string';
import 'core-js/modules/es7.array.includes';
import 'core-js/modules/es6.string.includes';
import { snakeCase, forAll, isFunction, isObject, isArray as isArray$1, isPromise, promiseTimeout, waitTime, onDOM, isNumeric, isString } from 'helper-js';
import 'core-js/modules/es6.array.find';
import 'regenerator-runtime/runtime';
import 'core-js/modules/es6.function.name';
import 'core-js/modules/web.dom.iterable';
import 'core-js/modules/es6.regexp.replace';
import 'core-js/modules/es6.array.iterator';
import 'core-js/modules/es6.promise';
import 'core-js/modules/es7.promise.finally';
import { iterateObjectWithoutDollarDash, watchAsync } from 'vue-functions';

var promise$1 = promise;

var isArray$2 = isArray;

function _arrayWithoutHoles(arr) {
  if (isArray$2(arr)) {
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

var keys$1 = keys;

var values$1 = values;

var getOwnPropertyNames$1 = getOwnPropertyNames;

var getIterator$1 = getIterator;

var assign$1 = assign;

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

var rules = {
  accepted: function accepted(value) {
    return value === 'yes' || value === 'on' || value === true || value === 1 || value === '1';
  },
  alpha: function alpha(value) {
    return /^[a-zA-Z]+$/.test(value);
  },
  alphaDash: function alphaDash(value) {
    return /^[\w-]+$/.test(value);
  },
  alphaNum: function alphaNum(value) {
    return /^[\w]+$/.test(value);
  },
  between: function between(value, params) {
    return params[0] <= value && params[1] <= value;
  },
  different: function different(value, params) {
    var relatedField = isFunction(params[0]) ? params[0](field) : params[0];
    return value !== relatedField.$value;
  },
  email: function email(value) {
    // from https://regexlib.com/Search.aspx?k=email
    return /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(value);
  },
  in: function _in(value, params) {
    return params[0].indexOf(value) > -1;
  },
  integer: function integer(value) {
    return isNumeric(value) && !value.toString().includes('.');
  },
  length: function length(value, params) {
    return (value || '').length === params[0];
  },
  lengthBetween: function lengthBetween(value, params) {
    var len = (value || '').length;
    return params[0] <= len && len <= params[1];
  },
  max: function max(value, params) {
    return value <= params[0];
  },
  maxLength: function maxLength(value, params) {
    return (value || '').length <= params[0];
  },
  min: function min(value, params) {
    return value >= params[0];
  },
  minLength: function minLength(value, params) {
    return (value || '').length >= params[0];
  },
  notIn: function notIn(value, params) {
    return params[0].indexOf(value) === -1;
  },
  numeric: function numeric(value) {
    return isNumeric(value);
  },
  regex: function regex(value, params) {
    var reg = isString(params[0]) ? new RegExp(params[0]) : params[0];
    return reg.test(value);
  },
  required: {
    type: 'required',
    handler: function handler(value, params) {
      return params[0];
    }
  },
  // require if related field not empty
  requiredIfField: {
    type: 'required',
    handler: function handler(value, params, field) {
      var relatedField = isFunction(params[0]) ? params[0](field) : params[0];
      return {
        __validate: !relatedField.$empty,
        value: relatedField
      };
    }
  },
  // required if getter return true
  requiredIf: {
    type: 'required',
    handler: function handler(value, params, field) {
      return params[0](field);
    }
  },
  same: function same(value, params, field) {
    var relatedField = params[0](field);
    return {
      __validate: value === relatedField.$value,
      value: relatedField
    };
  }
};

var VueFinalValidateField =
/*#__PURE__*/
function () {
  _createClass(VueFinalValidateField, null, [{
    key: "generateName",
    // static -------------
    // str to name
    value: function generateName(str) {
      return snakeCase(str).replace(/_/g, ' ');
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

    _defineProperty(this, "_ignore", null);

    _defineProperty(this, "$ignore", null);

    _defineProperty(this, "$ignoreIf", null);

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

      var unwatch = this.$vm.$watch(function () {
        if (_this.$each) {
          // with $each, mainly for array
          var children = {};

          if (_this.$value) {
            var count = 0;
            forAll(_this.$value, function (value, indexOrKey) {
              var childField = _this.$each(value, indexOrKey, count, _this);

              children[indexOrKey] = childField;
              count++;
            });
          }

          return children;
        }
      }, function (children, old) {
        if (!_this.$each) {
          return;
        }

        if (old) {
          var needDelete;

          if (children) {
            var newKeys = keys$1(children);

            needDelete = keys$1(old).filter(function (key) {
              return !newKeys.includes(key);
            });
          } else {
            needDelete = keys$1(old);
          }

          needDelete.forEach(function (key) {
            _this.$delete(key);
          });
        }

        if (children) {
          keys$1(children).forEach(function (key) {
            if (old && old[key]) {
              assign$1(_this[key], children[key]);

              children[key] = _this[key];
            } else {
              children[key] = new cls(_this.$vm, children[key], _this.$globalConfig, _this, key, _this.$validation);
              children[key]._notBaseStarted = true;

              _this.$vm.$set(_this, key, children[key]);
            }
          });

          _this.$children = keys$1(children).length > 0 ? children : null;

          values$1(children).forEach(function (c) {
            if (c._notBaseStarted) {
              c._baseStart();
            }
          });

          if (_this.$validation.$started) {
            values$1(children).forEach(function (c) {
              if (!c.$started) {
                c.$start();
              }
            });
          }
        } else {
          _this.$children = null;
        }
      }, {
        immediate: true
      });

      this._baseUnwatches.push(unwatch);
    }
  }, {
    key: "_updateChildren",
    value: function _updateChildren() {
      if (this.$each) {
        this.$isParent = true;
      } else if (this.$isParent || this === this.$validation || this.$rules) {
        // is parent
        // validation or with `$rules`
        this.$isParent = true;
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = getIterator$1(iterateObjectWithoutDollarDash(this)), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var _step2$value = _step2.value,
                key = _step2$value.key,
                value = _step2$value.value;
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
      } else {
        this.$isParent = false;
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
          var t = findParent(_this2, function (field) {
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

      var unwatch = watchAsync(this.$vm, function (exec) {
        var rulesForRequired = [];
        var rulesForValid = [];
        var rules$$1;

        if (exec(function () {
          return _this3.$each || _this3.$isParent || _this3.$rules || _this3 === _this3.$validation;
        })) {
          rules$$1 = _this3.$rules;

          if (isFunction(rules$$1)) {
            rules$$1 = exec(function () {
              return rules$$1(_this3);
            });
          } else if (rules$$1) {
            // clone
            rules$$1 = assign$1({}, rules$$1);
          } else {
            rules$$1 = {};
          }
        } else {
          // end field
          rules$$1 = {};
          var _iteratorNormalCompletion3 = true;
          var _didIteratorError3 = false;
          var _iteratorError3 = undefined;

          try {
            var _loop = function _loop() {
              var _step3$value = _step3.value,
                  key = _step3$value.key,
                  value = _step3$value.value;
              exec(function () {
                return _this3[key];
              });
              rules$$1[key] = value;
            };

            for (var _iterator3 = getIterator$1(iterateObjectWithoutDollarDash(_this3)), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
              _loop();
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

        if (!rules$$1 || keys$1(rules$$1).length === 0) {
          return;
        }

        return exec(function () {
          var _loop2 = function _loop2(name) {
            var ruleInfo = rules$$1[name];

            if (!isObject(ruleInfo)) {
              ruleInfo = {
                params: isArray$1(ruleInfo) ? ruleInfo : [ruleInfo]
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
                    __validate: false,
                    error: e,
                    message: systemErrorMessage
                  };
                };

                try {
                  var ruleReturn = ruleHandler(_this3.$value, ruleInfo.params, _this3, exec);

                  if (isPromise(ruleReturn)) {
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
                regeneratorRuntime.mark(function _callee2(ruleReturn) {
                  var resolveMessage, messageTpl, message, i, param, reg;
                  return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                      switch (_context2.prev = _context2.next) {
                        case 0:
                          // convert message to str from str, function, null
                          resolveMessage =
                          /*#__PURE__*/
                          function () {
                            var _ref = _asyncToGenerator(
                            /*#__PURE__*/
                            regeneratorRuntime.mark(function _callee(message) {
                              return regeneratorRuntime.wrap(function _callee$(_context) {
                                while (1) {
                                  switch (_context.prev = _context.next) {
                                    case 0:
                                      if (!isFunction(message)) {
                                        _context.next = 4;
                                        break;
                                      }

                                      _context.next = 3;
                                      return message(_this3.$value, ruleInfo.params, _this3, ruleReturn);

                                    case 3:
                                      message = _context.sent;

                                    case 4:
                                      return _context.abrupt("return", message);

                                    case 5:
                                    case "end":
                                      return _context.stop();
                                  }
                                }
                              }, _callee, this);
                            }));

                            return function resolveMessage(_x2) {
                              return _ref.apply(this, arguments);
                            };
                          }(); //
                          // get message from config


                          messageTpl = ruleInfo.message || _this3.$globalConfig.rules[name] && _this3.$globalConfig.rules[name].message;

                          if (!messageTpl) {
                            // get message from parent defaultMessage
                            messageTpl = _this3.$globalConfig.defaultMessage;
                          } // compile message


                          _context2.next = 5;
                          return resolveMessage(messageTpl);

                        case 5:
                          messageTpl = _context2.sent;
                          message = messageTpl.replace(/:name/g, _this3.$name).replace(/:value/g, _this3.$value);

                          if (ruleInfo.params) {
                            for (i = 0; i < ruleInfo.params.length; i++) {
                              param = ruleInfo.params[i];
                              reg = new RegExp(':params\\[' + i + '\\]', 'g');
                              message = message.replace(reg, param);
                            }
                          }

                          return _context2.abrupt("return", message);

                        case 9:
                        case "end":
                          return _context2.stop();
                      }
                    }
                  }, _callee2, this);
                }));

                function message(_x) {
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

            rules$$1[name] = wrappedRule;
          };

          for (var name in rules$$1) {
            _loop2(name);
          }

          return {
            required: rulesForRequired,
            valid: rulesForValid,
            rules: rules$$1
          };
        });
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

      if (this.$children) {
        values$1(this.$children).forEach(function (childField) {
          childField.$stop();
        });
      }

      this.$started = false;
    } // advanced watch ===============
    // watch and auto update `dirty`, `inputting`, `valid`, `validating`, `ignore`

  }, {
    key: "_watchForStatus",
    value: function _watchForStatus() {
      var _this4 = this;

      var unwatch; // computed status: $dirty, $inputting, $valid, $validating, $ignore

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
        return _this4._valid && (!_this4.$children || values$1(_this4.$children).every(function (c) {
          return c.$valid;
        }));
      }, function (value) {
        _this4.$valid = Boolean(value);
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
        return _this4.$ignoreIf && _this4.$ignoreIf(_this4);
      }, function (value) {
        _this4._ignore = Boolean(value);
      }, {
        immediate: true
      });

      this._unwatches.push(unwatch);

      unwatch = this.$vm.$watch(function () {
        if (findParent(_this4, function (field) {
          return field._ignore;
        })) {
          return true;
        }

        return _this4._ignore;
      }, function (value) {
        _this4.$ignore = Boolean(value);
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
        deep: this.$deep
      });

      this._unwatches.push(unwatch);
    } // watch and auto update `$required`, `_valid`, `_validating`, `_errors`

  }, {
    key: "_watchForValidate",
    value: function _watchForValidate() {
      var _this5 = this;

      var validateId = -1;
      var unwatch = watchAsync(this.$vm,
      /*#__PURE__*/
      function () {
        var _ref2 = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee3(exec) {
          var id, rules$$1, rulesRequired, rulesValid, required, valid, reasons, _loop3, i, _ret, _iteratorNormalCompletion4, _didIteratorError4, _iteratorError4, _loop4, _iterator4, _step4, _ret2;

          return regeneratorRuntime.wrap(function _callee3$(_context5) {
            while (1) {
              switch (_context5.prev = _context5.next) {
                case 0:
                  validateId++;
                  id = validateId;
                  exec(function () {
                    return _this5._rules;
                  });
                  rules$$1 = _this5._rules;
                  exec(function () {
                    return _this5._rulesForRequired;
                  });
                  rulesRequired = _this5._rulesForRequired;
                  exec(function () {
                    return _this5._rulesForValid;
                  });
                  rulesValid = _this5._rulesForValid;
                  required = false;
                  valid = true;
                  reasons = [];
                  exec(function () {
                    return _this5.$ignore;
                  });

                  if (!_this5.$ignore) {
                    _context5.next = 14;
                    break;
                  }

                  return _context5.abrupt("return", {
                    ignore: true
                  });

                case 14:
                  exec(function () {
                    return _this5.$inputting;
                  });

                  if (!_this5.$inputting) {
                    _context5.next = 17;
                    break;
                  }

                  return _context5.abrupt("return", {
                    inputting: true
                  });

                case 17:
                  // observe $value
                  exec(function () {
                    return _this5.$value;
                  }, {
                    deep: _this5.$deep
                  });
                  _this5._validating = true; // check required

                  _loop3 =
                  /*#__PURE__*/
                  regeneratorRuntime.mark(function _loop3(i) {
                    var rule, t, ruleReturn;
                    return regeneratorRuntime.wrap(function _loop3$(_context3) {
                      while (1) {
                        switch (_context3.prev = _context3.next) {
                          case 0:
                            rule = rulesRequired[i];
                            exec(function () {
                              return rule.handler;
                            });
                            t = exec(function () {
                              return rule.handler(exec);
                            });

                            if (isPromise(t) && _this5.$globalConfig.timeout) {
                              t = promiseTimeout(t, _this5.$globalConfig.timeout);
                            }

                            _context3.next = 6;
                            return t;

                          case 6:
                            ruleReturn = _context3.sent;

                            if (!(id !== validateId)) {
                              _context3.next = 9;
                              break;
                            }

                            return _context3.abrupt("return", {
                              v: {
                                expired: true
                              }
                            });

                          case 9:
                            if (ruleReturn && ruleReturn.hasOwnProperty('__validate')) {
                              required = ruleReturn.__validate;
                              ruleReturn = ruleReturn.value;
                            } else {
                              required = Boolean(ruleReturn);
                            }

                            if (!(i === rulesRequired.length - 1)) {
                              _context3.next = 18;
                              break;
                            }

                            // last rule
                            exec(function () {
                              return _this5.$empty;
                            });

                            if (!(required && _this5.$empty)) {
                              _context3.next = 18;
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
                              _context3.next = 18;
                              break;
                            }

                            return _context3.abrupt("return", {
                              v: {
                                required: required,
                                valid: valid,
                                reasons: reasons,
                                id: id
                              }
                            });

                          case 18:
                          case "end":
                            return _context3.stop();
                        }
                      }
                    }, _loop3, this);
                  });
                  i = 0;

                case 21:
                  if (!(i < rulesRequired.length)) {
                    _context5.next = 29;
                    break;
                  }

                  return _context5.delegateYield(_loop3(i), "t0", 23);

                case 23:
                  _ret = _context5.t0;

                  if (!(_typeof(_ret) === "object")) {
                    _context5.next = 26;
                    break;
                  }

                  return _context5.abrupt("return", _ret.v);

                case 26:
                  i++;
                  _context5.next = 21;
                  break;

                case 29:
                  exec(function () {
                    return _this5._dirty;
                  });

                  if (_this5._dirty) {
                    _context5.next = 32;
                    break;
                  }

                  return _context5.abrupt("return", {
                    required: required,
                    valid: valid,
                    reasons: reasons,
                    id: id
                  });

                case 32:
                  exec(function () {
                    return !required && _this5.$empty && _this5.$globalConfig.bail;
                  });

                  if (!(!required && _this5.$empty && _this5.$globalConfig.bail)) {
                    _context5.next = 36;
                    break;
                  }

                  valid = true;
                  return _context5.abrupt("return", {
                    required: required,
                    valid: valid,
                    id: id
                  });

                case 36:
                  // check valid
                  _iteratorNormalCompletion4 = true;
                  _didIteratorError4 = false;
                  _iteratorError4 = undefined;
                  _context5.prev = 39;
                  _loop4 =
                  /*#__PURE__*/
                  regeneratorRuntime.mark(function _loop4() {
                    var rule, t, ruleReturn;
                    return regeneratorRuntime.wrap(function _loop4$(_context4) {
                      while (1) {
                        switch (_context4.prev = _context4.next) {
                          case 0:
                            rule = _step4.value;
                            exec(function () {
                              return rule.handler;
                            });
                            t = exec(function () {
                              return rule.handler(exec);
                            });

                            if (isPromise(t) && _this5.$globalConfig.timeout) {
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
                            if (ruleReturn && ruleReturn.hasOwnProperty('__validate')) {
                              valid = ruleReturn.__validate;
                              ruleReturn = ruleReturn.value;
                            } else {
                              valid = Boolean(ruleReturn);
                            }

                            if (valid) {
                              _context4.next = 15;
                              break;
                            }

                            reasons.push({
                              ruleReturn: ruleReturn,
                              rule: rule
                            });
                            exec(function () {
                              return _this5.$globalConfig.bail;
                            });

                            if (!_this5.$globalConfig.bail) {
                              _context4.next = 15;
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

                          case 15:
                          case "end":
                            return _context4.stop();
                        }
                      }
                    }, _loop4, this);
                  });
                  _iterator4 = getIterator$1(rulesValid);

                case 42:
                  if (_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done) {
                    _context5.next = 50;
                    break;
                  }

                  return _context5.delegateYield(_loop4(), "t1", 44);

                case 44:
                  _ret2 = _context5.t1;

                  if (!(_typeof(_ret2) === "object")) {
                    _context5.next = 47;
                    break;
                  }

                  return _context5.abrupt("return", _ret2.v);

                case 47:
                  _iteratorNormalCompletion4 = true;
                  _context5.next = 42;
                  break;

                case 50:
                  _context5.next = 56;
                  break;

                case 52:
                  _context5.prev = 52;
                  _context5.t2 = _context5["catch"](39);
                  _didIteratorError4 = true;
                  _iteratorError4 = _context5.t2;

                case 56:
                  _context5.prev = 56;
                  _context5.prev = 57;

                  if (!_iteratorNormalCompletion4 && _iterator4.return != null) {
                    _iterator4.return();
                  }

                case 59:
                  _context5.prev = 59;

                  if (!_didIteratorError4) {
                    _context5.next = 62;
                    break;
                  }

                  throw _iteratorError4;

                case 62:
                  return _context5.finish(59);

                case 63:
                  return _context5.finish(56);

                case 64:
                  return _context5.abrupt("return", {
                    required: required,
                    valid: valid,
                    reasons: reasons,
                    id: id
                  });

                case 65:
                case "end":
                  return _context5.stop();
              }
            }
          }, _callee3, this, [[39, 52, 56, 64], [57,, 59, 63]]);
        }));

        return function (_x3) {
          return _ref2.apply(this, arguments);
        };
      }(),
      /*#__PURE__*/
      function () {
        var _ref3 = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee4(value, old) {
          var _errors, errors, _iteratorNormalCompletion5, _didIteratorError5, _iteratorError5, _iterator5, _step5, _step5$value, ruleReturn, rule, message;

          return regeneratorRuntime.wrap(function _callee4$(_context6) {
            while (1) {
              switch (_context6.prev = _context6.next) {
                case 0:
                  if (!(value.inputting || value.expired)) {
                    _context6.next = 2;
                    break;
                  }

                  return _context6.abrupt("return");

                case 2:
                  if (!value.ignore) {
                    _context6.next = 9;
                    break;
                  }

                  _this5.$required = false;
                  _this5._valid = true;
                  _errors = [];
                  _this5._errors = _errors;
                  _this5._validating = false;
                  return _context6.abrupt("return");

                case 9:
                  _this5.$required = value.required;
                  _this5._valid = value.valid;
                  errors = [];

                  if (!value.reasons) {
                    _context6.next = 43;
                    break;
                  }

                  _iteratorNormalCompletion5 = true;
                  _didIteratorError5 = false;
                  _iteratorError5 = undefined;
                  _context6.prev = 16;
                  _iterator5 = getIterator$1(value.reasons);

                case 18:
                  if (_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done) {
                    _context6.next = 29;
                    break;
                  }

                  _step5$value = _step5.value, ruleReturn = _step5$value.ruleReturn, rule = _step5$value.rule;
                  _context6.next = 22;
                  return rule.message(ruleReturn);

                case 22:
                  message = _context6.sent;

                  if (!(value.id !== validateId)) {
                    _context6.next = 25;
                    break;
                  }

                  return _context6.abrupt("return");

                case 25:
                  errors.push({
                    field: _this5,
                    ruleName: rule.name,
                    message: message
                  });

                case 26:
                  _iteratorNormalCompletion5 = true;
                  _context6.next = 18;
                  break;

                case 29:
                  _context6.next = 35;
                  break;

                case 31:
                  _context6.prev = 31;
                  _context6.t0 = _context6["catch"](16);
                  _didIteratorError5 = true;
                  _iteratorError5 = _context6.t0;

                case 35:
                  _context6.prev = 35;
                  _context6.prev = 36;

                  if (!_iteratorNormalCompletion5 && _iterator5.return != null) {
                    _iterator5.return();
                  }

                case 38:
                  _context6.prev = 38;

                  if (!_didIteratorError5) {
                    _context6.next = 41;
                    break;
                  }

                  throw _iteratorError5;

                case 41:
                  return _context6.finish(38);

                case 42:
                  return _context6.finish(35);

                case 43:
                  _this5._errors = errors;
                  _this5._validating = false;

                case 45:
                case "end":
                  return _context6.stop();
              }
            }
          }, _callee4, this, [[16, 31, 35, 43], [36,, 38, 42]]);
        }));

        return function (_x4, _x5) {
          return _ref3.apply(this, arguments);
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
        },
        /*#__PURE__*/
        function () {
          var _ref4 = _asyncToGenerator(
          /*#__PURE__*/
          regeneratorRuntime.mark(function _callee5(validating) {
            var e;
            return regeneratorRuntime.wrap(function _callee5$(_context7) {
              while (1) {
                switch (_context7.prev = _context7.next) {
                  case 0:
                    _context7.next = 2;
                    return waitTime(0);

                  case 2:
                    if (!validating) {
                      unwatch();

                      if (_this6.$valid) {
                        resolve(_this6);
                      } else {
                        e = new Error('Invalid input.');
                        e.name = 'invalid';
                        reject(e);
                      }
                    }

                  case 3:
                  case "end":
                    return _context7.stop();
                }
              }
            }, _callee5, this);
          }));

          return function (_x6) {
            return _ref4.apply(this, arguments);
          };
        }(), {
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

  initValidation.locale = 'en';

  assign$1(initValidation, {
    addRules: function addRules(rules$$1) {
      var _this7 = this;

      var newRules = {};

      keys$1(rules$$1).forEach(function (key) {
        var newRule = isFunction(rules$$1[key]) ? {
          handler: rules$$1[key]
        } : assign$1({}, rules$$1[key]);
        newRules[key] = newRule;

        newRule.message = function (value, params, field, ruleReturn) {
          var locale = _this7.locale || 'default';
          var message = _this7.messages[locale][key];

          if (isFunction(message)) {
            return message(value, params, field, ruleReturn);
          }

          return message;
        };
      });

      assign$1(this.rules, newRules);
    },
    addMessages: function addMessages(messages) {
      var locale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'default';

      if (!this.messages) {
        this.messages = {};
      }

      if (!this.messages[locale]) {
        this.messages[locale] = {};
      }

      assign$1(this.messages[locale], messages);
    }
  });

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

  onDOM(window, 'keydown', handler);
  onDOM(window, 'mousedown', handler);
  onDOM(window, 'dragstart', handler);
  onDOM(window, 'dragend', handler);
}
function install(Vue, config) {
  if (typeof window !== 'undefined') {
    listenUserInput();
  }

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
  validateMethod.addRules(rules);
  return validateMethod;
}
function findParent(field, handler) {
  var current = field;

  while (current) {
    if (handler(current)) {
      return current;
    }

    current = current.$parent;
  }
}

export default install;
export { VueFinalValidateField, cls, makeMountPoint, getDefaultConfig, makeValidateMethod, listenUserInput, findParent };
