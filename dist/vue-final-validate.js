/*!
 * vue-final-validate v1.0.7
 * (c) 2017-present phphe <phphe@outlook.com>
 * Released under the MIT License.
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.vueFinalValidate = {})));
}(this, (function (exports) { 'use strict';

  // 7.1.4 ToInteger
  var ceil = Math.ceil;
  var floor = Math.floor;
  var _toInteger = function (it) {
    return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
  };

  // 7.2.1 RequireObjectCoercible(argument)
  var _defined = function (it) {
    if (it == undefined) throw TypeError("Can't call method on  " + it);
    return it;
  };

  // true  -> String#at
  // false -> String#codePointAt
  var _stringAt = function (TO_STRING) {
    return function (that, pos) {
      var s = String(_defined(that));
      var i = _toInteger(pos);
      var l = s.length;
      var a, b;
      if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
      a = s.charCodeAt(i);
      return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
        ? TO_STRING ? s.charAt(i) : a
        : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
    };
  };

  var _library = true;

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var _global = createCommonjsModule(function (module) {
  // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
  var global = module.exports = typeof window != 'undefined' && window.Math == Math
    ? window : typeof self != 'undefined' && self.Math == Math ? self
    // eslint-disable-next-line no-new-func
    : Function('return this')();
  if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef
  });

  var _core = createCommonjsModule(function (module) {
  var core = module.exports = { version: '2.6.1' };
  if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef
  });
  var _core_1 = _core.version;

  var _aFunction = function (it) {
    if (typeof it != 'function') throw TypeError(it + ' is not a function!');
    return it;
  };

  // optional / simple context binding

  var _ctx = function (fn, that, length) {
    _aFunction(fn);
    if (that === undefined) return fn;
    switch (length) {
      case 1: return function (a) {
        return fn.call(that, a);
      };
      case 2: return function (a, b) {
        return fn.call(that, a, b);
      };
      case 3: return function (a, b, c) {
        return fn.call(that, a, b, c);
      };
    }
    return function (/* ...args */) {
      return fn.apply(that, arguments);
    };
  };

  var _isObject = function (it) {
    return typeof it === 'object' ? it !== null : typeof it === 'function';
  };

  var _anObject = function (it) {
    if (!_isObject(it)) throw TypeError(it + ' is not an object!');
    return it;
  };

  var _fails = function (exec) {
    try {
      return !!exec();
    } catch (e) {
      return true;
    }
  };

  // Thank's IE8 for his funny defineProperty
  var _descriptors = !_fails(function () {
    return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
  });

  var document$1 = _global.document;
  // typeof document.createElement is 'object' in old IE
  var is = _isObject(document$1) && _isObject(document$1.createElement);
  var _domCreate = function (it) {
    return is ? document$1.createElement(it) : {};
  };

  var _ie8DomDefine = !_descriptors && !_fails(function () {
    return Object.defineProperty(_domCreate('div'), 'a', { get: function () { return 7; } }).a != 7;
  });

  // 7.1.1 ToPrimitive(input [, PreferredType])

  // instead of the ES6 spec version, we didn't implement @@toPrimitive case
  // and the second argument - flag - preferred type is a string
  var _toPrimitive = function (it, S) {
    if (!_isObject(it)) return it;
    var fn, val;
    if (S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
    if (typeof (fn = it.valueOf) == 'function' && !_isObject(val = fn.call(it))) return val;
    if (!S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
    throw TypeError("Can't convert object to primitive value");
  };

  var dP = Object.defineProperty;

  var f = _descriptors ? Object.defineProperty : function defineProperty(O, P, Attributes) {
    _anObject(O);
    P = _toPrimitive(P, true);
    _anObject(Attributes);
    if (_ie8DomDefine) try {
      return dP(O, P, Attributes);
    } catch (e) { /* empty */ }
    if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
    if ('value' in Attributes) O[P] = Attributes.value;
    return O;
  };

  var _objectDp = {
  	f: f
  };

  var _propertyDesc = function (bitmap, value) {
    return {
      enumerable: !(bitmap & 1),
      configurable: !(bitmap & 2),
      writable: !(bitmap & 4),
      value: value
    };
  };

  var _hide = _descriptors ? function (object, key, value) {
    return _objectDp.f(object, key, _propertyDesc(1, value));
  } : function (object, key, value) {
    object[key] = value;
    return object;
  };

  var hasOwnProperty = {}.hasOwnProperty;
  var _has = function (it, key) {
    return hasOwnProperty.call(it, key);
  };

  var PROTOTYPE = 'prototype';

  var $export = function (type, name, source) {
    var IS_FORCED = type & $export.F;
    var IS_GLOBAL = type & $export.G;
    var IS_STATIC = type & $export.S;
    var IS_PROTO = type & $export.P;
    var IS_BIND = type & $export.B;
    var IS_WRAP = type & $export.W;
    var exports = IS_GLOBAL ? _core : _core[name] || (_core[name] = {});
    var expProto = exports[PROTOTYPE];
    var target = IS_GLOBAL ? _global : IS_STATIC ? _global[name] : (_global[name] || {})[PROTOTYPE];
    var key, own, out;
    if (IS_GLOBAL) source = name;
    for (key in source) {
      // contains in native
      own = !IS_FORCED && target && target[key] !== undefined;
      if (own && _has(exports, key)) continue;
      // export native or passed
      out = own ? target[key] : source[key];
      // prevent global pollution for namespaces
      exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
      // bind timers to global for call from export context
      : IS_BIND && own ? _ctx(out, _global)
      // wrap global constructors for prevent change them in library
      : IS_WRAP && target[key] == out ? (function (C) {
        var F = function (a, b, c) {
          if (this instanceof C) {
            switch (arguments.length) {
              case 0: return new C();
              case 1: return new C(a);
              case 2: return new C(a, b);
            } return new C(a, b, c);
          } return C.apply(this, arguments);
        };
        F[PROTOTYPE] = C[PROTOTYPE];
        return F;
      // make static versions for prototype methods
      })(out) : IS_PROTO && typeof out == 'function' ? _ctx(Function.call, out) : out;
      // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
      if (IS_PROTO) {
        (exports.virtual || (exports.virtual = {}))[key] = out;
        // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
        if (type & $export.R && expProto && !expProto[key]) _hide(expProto, key, out);
      }
    }
  };
  // type bitmap
  $export.F = 1;   // forced
  $export.G = 2;   // global
  $export.S = 4;   // static
  $export.P = 8;   // proto
  $export.B = 16;  // bind
  $export.W = 32;  // wrap
  $export.U = 64;  // safe
  $export.R = 128; // real proto method for `library`
  var _export = $export;

  var _redefine = _hide;

  var _iterators = {};

  var toString = {}.toString;

  var _cof = function (it) {
    return toString.call(it).slice(8, -1);
  };

  // fallback for non-array-like ES3 and non-enumerable old V8 strings

  // eslint-disable-next-line no-prototype-builtins
  var _iobject = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
    return _cof(it) == 'String' ? it.split('') : Object(it);
  };

  // to indexed object, toObject with fallback for non-array-like ES3 strings


  var _toIobject = function (it) {
    return _iobject(_defined(it));
  };

  // 7.1.15 ToLength

  var min = Math.min;
  var _toLength = function (it) {
    return it > 0 ? min(_toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
  };

  var max = Math.max;
  var min$1 = Math.min;
  var _toAbsoluteIndex = function (index, length) {
    index = _toInteger(index);
    return index < 0 ? max(index + length, 0) : min$1(index, length);
  };

  // false -> Array#indexOf
  // true  -> Array#includes



  var _arrayIncludes = function (IS_INCLUDES) {
    return function ($this, el, fromIndex) {
      var O = _toIobject($this);
      var length = _toLength(O.length);
      var index = _toAbsoluteIndex(fromIndex, length);
      var value;
      // Array#includes uses SameValueZero equality algorithm
      // eslint-disable-next-line no-self-compare
      if (IS_INCLUDES && el != el) while (length > index) {
        value = O[index++];
        // eslint-disable-next-line no-self-compare
        if (value != value) return true;
      // Array#indexOf ignores holes, Array#includes - not
      } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
        if (O[index] === el) return IS_INCLUDES || index || 0;
      } return !IS_INCLUDES && -1;
    };
  };

  var _shared = createCommonjsModule(function (module) {
  var SHARED = '__core-js_shared__';
  var store = _global[SHARED] || (_global[SHARED] = {});

  (module.exports = function (key, value) {
    return store[key] || (store[key] = value !== undefined ? value : {});
  })('versions', []).push({
    version: _core.version,
    mode: 'pure',
    copyright: '© 2018 Denis Pushkarev (zloirock.ru)'
  });
  });

  var id = 0;
  var px = Math.random();
  var _uid = function (key) {
    return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
  };

  var shared = _shared('keys');

  var _sharedKey = function (key) {
    return shared[key] || (shared[key] = _uid(key));
  };

  var arrayIndexOf = _arrayIncludes(false);
  var IE_PROTO = _sharedKey('IE_PROTO');

  var _objectKeysInternal = function (object, names) {
    var O = _toIobject(object);
    var i = 0;
    var result = [];
    var key;
    for (key in O) if (key != IE_PROTO) _has(O, key) && result.push(key);
    // Don't enum bug & hidden keys
    while (names.length > i) if (_has(O, key = names[i++])) {
      ~arrayIndexOf(result, key) || result.push(key);
    }
    return result;
  };

  // IE 8- don't enum bug keys
  var _enumBugKeys = (
    'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
  ).split(',');

  // 19.1.2.14 / 15.2.3.14 Object.keys(O)



  var _objectKeys = Object.keys || function keys(O) {
    return _objectKeysInternal(O, _enumBugKeys);
  };

  var _objectDps = _descriptors ? Object.defineProperties : function defineProperties(O, Properties) {
    _anObject(O);
    var keys = _objectKeys(Properties);
    var length = keys.length;
    var i = 0;
    var P;
    while (length > i) _objectDp.f(O, P = keys[i++], Properties[P]);
    return O;
  };

  var document$2 = _global.document;
  var _html = document$2 && document$2.documentElement;

  // 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])



  var IE_PROTO$1 = _sharedKey('IE_PROTO');
  var Empty = function () { /* empty */ };
  var PROTOTYPE$1 = 'prototype';

  // Create object with fake `null` prototype: use iframe Object with cleared prototype
  var createDict = function () {
    // Thrash, waste and sodomy: IE GC bug
    var iframe = _domCreate('iframe');
    var i = _enumBugKeys.length;
    var lt = '<';
    var gt = '>';
    var iframeDocument;
    iframe.style.display = 'none';
    _html.appendChild(iframe);
    iframe.src = 'javascript:'; // eslint-disable-line no-script-url
    // createDict = iframe.contentWindow.Object;
    // html.removeChild(iframe);
    iframeDocument = iframe.contentWindow.document;
    iframeDocument.open();
    iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
    iframeDocument.close();
    createDict = iframeDocument.F;
    while (i--) delete createDict[PROTOTYPE$1][_enumBugKeys[i]];
    return createDict();
  };

  var _objectCreate = Object.create || function create(O, Properties) {
    var result;
    if (O !== null) {
      Empty[PROTOTYPE$1] = _anObject(O);
      result = new Empty();
      Empty[PROTOTYPE$1] = null;
      // add "__proto__" for Object.getPrototypeOf polyfill
      result[IE_PROTO$1] = O;
    } else result = createDict();
    return Properties === undefined ? result : _objectDps(result, Properties);
  };

  var _wks = createCommonjsModule(function (module) {
  var store = _shared('wks');

  var Symbol = _global.Symbol;
  var USE_SYMBOL = typeof Symbol == 'function';

  var $exports = module.exports = function (name) {
    return store[name] || (store[name] =
      USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : _uid)('Symbol.' + name));
  };

  $exports.store = store;
  });

  var def = _objectDp.f;

  var TAG = _wks('toStringTag');

  var _setToStringTag = function (it, tag, stat) {
    if (it && !_has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
  };

  var IteratorPrototype = {};

  // 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
  _hide(IteratorPrototype, _wks('iterator'), function () { return this; });

  var _iterCreate = function (Constructor, NAME, next) {
    Constructor.prototype = _objectCreate(IteratorPrototype, { next: _propertyDesc(1, next) });
    _setToStringTag(Constructor, NAME + ' Iterator');
  };

  // 7.1.13 ToObject(argument)

  var _toObject = function (it) {
    return Object(_defined(it));
  };

  // 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)


  var IE_PROTO$2 = _sharedKey('IE_PROTO');
  var ObjectProto = Object.prototype;

  var _objectGpo = Object.getPrototypeOf || function (O) {
    O = _toObject(O);
    if (_has(O, IE_PROTO$2)) return O[IE_PROTO$2];
    if (typeof O.constructor == 'function' && O instanceof O.constructor) {
      return O.constructor.prototype;
    } return O instanceof Object ? ObjectProto : null;
  };

  var ITERATOR = _wks('iterator');
  var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
  var FF_ITERATOR = '@@iterator';
  var KEYS = 'keys';
  var VALUES = 'values';

  var returnThis = function () { return this; };

  var _iterDefine = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
    _iterCreate(Constructor, NAME, next);
    var getMethod = function (kind) {
      if (!BUGGY && kind in proto) return proto[kind];
      switch (kind) {
        case KEYS: return function keys() { return new Constructor(this, kind); };
        case VALUES: return function values() { return new Constructor(this, kind); };
      } return function entries() { return new Constructor(this, kind); };
    };
    var TAG = NAME + ' Iterator';
    var DEF_VALUES = DEFAULT == VALUES;
    var VALUES_BUG = false;
    var proto = Base.prototype;
    var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
    var $default = $native || getMethod(DEFAULT);
    var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
    var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
    var methods, key, IteratorPrototype;
    // Fix native
    if ($anyNative) {
      IteratorPrototype = _objectGpo($anyNative.call(new Base()));
      if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
        // Set @@toStringTag to native iterators
        _setToStringTag(IteratorPrototype, TAG, true);
        // fix for some old engines
        if (!_library && typeof IteratorPrototype[ITERATOR] != 'function') _hide(IteratorPrototype, ITERATOR, returnThis);
      }
    }
    // fix Array#{values, @@iterator}.name in V8 / FF
    if (DEF_VALUES && $native && $native.name !== VALUES) {
      VALUES_BUG = true;
      $default = function values() { return $native.call(this); };
    }
    // Define iterator
    if ((!_library || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
      _hide(proto, ITERATOR, $default);
    }
    // Plug for library
    _iterators[NAME] = $default;
    _iterators[TAG] = returnThis;
    if (DEFAULT) {
      methods = {
        values: DEF_VALUES ? $default : getMethod(VALUES),
        keys: IS_SET ? $default : getMethod(KEYS),
        entries: $entries
      };
      if (FORCED) for (key in methods) {
        if (!(key in proto)) _redefine(proto, key, methods[key]);
      } else _export(_export.P + _export.F * (BUGGY || VALUES_BUG), NAME, methods);
    }
    return methods;
  };

  var $at = _stringAt(true);

  // 21.1.3.27 String.prototype[@@iterator]()
  _iterDefine(String, 'String', function (iterated) {
    this._t = String(iterated); // target
    this._i = 0;                // next index
  // 21.1.5.2.1 %StringIteratorPrototype%.next()
  }, function () {
    var O = this._t;
    var index = this._i;
    var point;
    if (index >= O.length) return { value: undefined, done: true };
    point = $at(O, index);
    this._i += point.length;
    return { value: point, done: false };
  });

  var _iterStep = function (done, value) {
    return { value: value, done: !!done };
  };

  // 22.1.3.4 Array.prototype.entries()
  // 22.1.3.13 Array.prototype.keys()
  // 22.1.3.29 Array.prototype.values()
  // 22.1.3.30 Array.prototype[@@iterator]()
  var es6_array_iterator = _iterDefine(Array, 'Array', function (iterated, kind) {
    this._t = _toIobject(iterated); // target
    this._i = 0;                   // next index
    this._k = kind;                // kind
  // 22.1.5.2.1 %ArrayIteratorPrototype%.next()
  }, function () {
    var O = this._t;
    var kind = this._k;
    var index = this._i++;
    if (!O || index >= O.length) {
      this._t = undefined;
      return _iterStep(1);
    }
    if (kind == 'keys') return _iterStep(0, index);
    if (kind == 'values') return _iterStep(0, O[index]);
    return _iterStep(0, [index, O[index]]);
  }, 'values');

  // argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
  _iterators.Arguments = _iterators.Array;

  var TO_STRING_TAG = _wks('toStringTag');

  var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
    'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
    'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
    'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
    'TextTrackList,TouchList').split(',');

  for (var i = 0; i < DOMIterables.length; i++) {
    var NAME = DOMIterables[i];
    var Collection = _global[NAME];
    var proto = Collection && Collection.prototype;
    if (proto && !proto[TO_STRING_TAG]) _hide(proto, TO_STRING_TAG, NAME);
    _iterators[NAME] = _iterators.Array;
  }

  // getting tag from 19.1.3.6 Object.prototype.toString()

  var TAG$1 = _wks('toStringTag');
  // ES3 wrong here
  var ARG = _cof(function () { return arguments; }()) == 'Arguments';

  // fallback for IE11 Script Access Denied error
  var tryGet = function (it, key) {
    try {
      return it[key];
    } catch (e) { /* empty */ }
  };

  var _classof = function (it) {
    var O, T, B;
    return it === undefined ? 'Undefined' : it === null ? 'Null'
      // @@toStringTag case
      : typeof (T = tryGet(O = Object(it), TAG$1)) == 'string' ? T
      // builtinTag case
      : ARG ? _cof(O)
      // ES3 arguments fallback
      : (B = _cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
  };

  var _anInstance = function (it, Constructor, name, forbiddenField) {
    if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
      throw TypeError(name + ': incorrect invocation!');
    } return it;
  };

  // call something on iterator step with safe closing on error

  var _iterCall = function (iterator, fn, value, entries) {
    try {
      return entries ? fn(_anObject(value)[0], value[1]) : fn(value);
    // 7.4.6 IteratorClose(iterator, completion)
    } catch (e) {
      var ret = iterator['return'];
      if (ret !== undefined) _anObject(ret.call(iterator));
      throw e;
    }
  };

  // check on default Array iterator

  var ITERATOR$1 = _wks('iterator');
  var ArrayProto = Array.prototype;

  var _isArrayIter = function (it) {
    return it !== undefined && (_iterators.Array === it || ArrayProto[ITERATOR$1] === it);
  };

  var ITERATOR$2 = _wks('iterator');

  var core_getIteratorMethod = _core.getIteratorMethod = function (it) {
    if (it != undefined) return it[ITERATOR$2]
      || it['@@iterator']
      || _iterators[_classof(it)];
  };

  var _forOf = createCommonjsModule(function (module) {
  var BREAK = {};
  var RETURN = {};
  var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
    var iterFn = ITERATOR ? function () { return iterable; } : core_getIteratorMethod(iterable);
    var f = _ctx(fn, that, entries ? 2 : 1);
    var index = 0;
    var length, step, iterator, result;
    if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
    // fast case for arrays with default iterator
    if (_isArrayIter(iterFn)) for (length = _toLength(iterable.length); length > index; index++) {
      result = entries ? f(_anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
      if (result === BREAK || result === RETURN) return result;
    } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
      result = _iterCall(iterator, f, step.value, entries);
      if (result === BREAK || result === RETURN) return result;
    }
  };
  exports.BREAK = BREAK;
  exports.RETURN = RETURN;
  });

  // 7.3.20 SpeciesConstructor(O, defaultConstructor)


  var SPECIES = _wks('species');
  var _speciesConstructor = function (O, D) {
    var C = _anObject(O).constructor;
    var S;
    return C === undefined || (S = _anObject(C)[SPECIES]) == undefined ? D : _aFunction(S);
  };

  // fast apply, http://jsperf.lnkit.com/fast-apply/5
  var _invoke = function (fn, args, that) {
    var un = that === undefined;
    switch (args.length) {
      case 0: return un ? fn()
                        : fn.call(that);
      case 1: return un ? fn(args[0])
                        : fn.call(that, args[0]);
      case 2: return un ? fn(args[0], args[1])
                        : fn.call(that, args[0], args[1]);
      case 3: return un ? fn(args[0], args[1], args[2])
                        : fn.call(that, args[0], args[1], args[2]);
      case 4: return un ? fn(args[0], args[1], args[2], args[3])
                        : fn.call(that, args[0], args[1], args[2], args[3]);
    } return fn.apply(that, args);
  };

  var process = _global.process;
  var setTask = _global.setImmediate;
  var clearTask = _global.clearImmediate;
  var MessageChannel = _global.MessageChannel;
  var Dispatch = _global.Dispatch;
  var counter = 0;
  var queue = {};
  var ONREADYSTATECHANGE = 'onreadystatechange';
  var defer, channel, port;
  var run = function () {
    var id = +this;
    // eslint-disable-next-line no-prototype-builtins
    if (queue.hasOwnProperty(id)) {
      var fn = queue[id];
      delete queue[id];
      fn();
    }
  };
  var listener = function (event) {
    run.call(event.data);
  };
  // Node.js 0.9+ & IE10+ has setImmediate, otherwise:
  if (!setTask || !clearTask) {
    setTask = function setImmediate(fn) {
      var args = [];
      var i = 1;
      while (arguments.length > i) args.push(arguments[i++]);
      queue[++counter] = function () {
        // eslint-disable-next-line no-new-func
        _invoke(typeof fn == 'function' ? fn : Function(fn), args);
      };
      defer(counter);
      return counter;
    };
    clearTask = function clearImmediate(id) {
      delete queue[id];
    };
    // Node.js 0.8-
    if (_cof(process) == 'process') {
      defer = function (id) {
        process.nextTick(_ctx(run, id, 1));
      };
    // Sphere (JS game engine) Dispatch API
    } else if (Dispatch && Dispatch.now) {
      defer = function (id) {
        Dispatch.now(_ctx(run, id, 1));
      };
    // Browsers with MessageChannel, includes WebWorkers
    } else if (MessageChannel) {
      channel = new MessageChannel();
      port = channel.port2;
      channel.port1.onmessage = listener;
      defer = _ctx(port.postMessage, port, 1);
    // Browsers with postMessage, skip WebWorkers
    // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
    } else if (_global.addEventListener && typeof postMessage == 'function' && !_global.importScripts) {
      defer = function (id) {
        _global.postMessage(id + '', '*');
      };
      _global.addEventListener('message', listener, false);
    // IE8-
    } else if (ONREADYSTATECHANGE in _domCreate('script')) {
      defer = function (id) {
        _html.appendChild(_domCreate('script'))[ONREADYSTATECHANGE] = function () {
          _html.removeChild(this);
          run.call(id);
        };
      };
    // Rest old browsers
    } else {
      defer = function (id) {
        setTimeout(_ctx(run, id, 1), 0);
      };
    }
  }
  var _task = {
    set: setTask,
    clear: clearTask
  };

  var macrotask = _task.set;
  var Observer = _global.MutationObserver || _global.WebKitMutationObserver;
  var process$1 = _global.process;
  var Promise$1 = _global.Promise;
  var isNode = _cof(process$1) == 'process';

  var _microtask = function () {
    var head, last, notify;

    var flush = function () {
      var parent, fn;
      if (isNode && (parent = process$1.domain)) parent.exit();
      while (head) {
        fn = head.fn;
        head = head.next;
        try {
          fn();
        } catch (e) {
          if (head) notify();
          else last = undefined;
          throw e;
        }
      } last = undefined;
      if (parent) parent.enter();
    };

    // Node.js
    if (isNode) {
      notify = function () {
        process$1.nextTick(flush);
      };
    // browsers with MutationObserver, except iOS Safari - https://github.com/zloirock/core-js/issues/339
    } else if (Observer && !(_global.navigator && _global.navigator.standalone)) {
      var toggle = true;
      var node = document.createTextNode('');
      new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
      notify = function () {
        node.data = toggle = !toggle;
      };
    // environments with maybe non-completely correct, but existent Promise
    } else if (Promise$1 && Promise$1.resolve) {
      // Promise.resolve without an argument throws an error in LG WebOS 2
      var promise = Promise$1.resolve(undefined);
      notify = function () {
        promise.then(flush);
      };
    // for other environments - macrotask based on:
    // - setImmediate
    // - MessageChannel
    // - window.postMessag
    // - onreadystatechange
    // - setTimeout
    } else {
      notify = function () {
        // strange IE + webpack dev server bug - use .call(global)
        macrotask.call(_global, flush);
      };
    }

    return function (fn) {
      var task = { fn: fn, next: undefined };
      if (last) last.next = task;
      if (!head) {
        head = task;
        notify();
      } last = task;
    };
  };

  // 25.4.1.5 NewPromiseCapability(C)


  function PromiseCapability(C) {
    var resolve, reject;
    this.promise = new C(function ($$resolve, $$reject) {
      if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
      resolve = $$resolve;
      reject = $$reject;
    });
    this.resolve = _aFunction(resolve);
    this.reject = _aFunction(reject);
  }

  var f$1 = function (C) {
    return new PromiseCapability(C);
  };

  var _newPromiseCapability = {
  	f: f$1
  };

  var _perform = function (exec) {
    try {
      return { e: false, v: exec() };
    } catch (e) {
      return { e: true, v: e };
    }
  };

  var navigator$1 = _global.navigator;

  var _userAgent = navigator$1 && navigator$1.userAgent || '';

  var _promiseResolve = function (C, x) {
    _anObject(C);
    if (_isObject(x) && x.constructor === C) return x;
    var promiseCapability = _newPromiseCapability.f(C);
    var resolve = promiseCapability.resolve;
    resolve(x);
    return promiseCapability.promise;
  };

  var _redefineAll = function (target, src, safe) {
    for (var key in src) {
      if (safe && target[key]) target[key] = src[key];
      else _hide(target, key, src[key]);
    } return target;
  };

  var SPECIES$1 = _wks('species');

  var _setSpecies = function (KEY) {
    var C = typeof _core[KEY] == 'function' ? _core[KEY] : _global[KEY];
    if (_descriptors && C && !C[SPECIES$1]) _objectDp.f(C, SPECIES$1, {
      configurable: true,
      get: function () { return this; }
    });
  };

  var ITERATOR$3 = _wks('iterator');
  var SAFE_CLOSING = false;

  try {
    var riter = [7][ITERATOR$3]();
    riter['return'] = function () { SAFE_CLOSING = true; };
  } catch (e) { /* empty */ }

  var _iterDetect = function (exec, skipClosing) {
    if (!skipClosing && !SAFE_CLOSING) return false;
    var safe = false;
    try {
      var arr = [7];
      var iter = arr[ITERATOR$3]();
      iter.next = function () { return { done: safe = true }; };
      arr[ITERATOR$3] = function () { return iter; };
      exec(arr);
    } catch (e) { /* empty */ }
    return safe;
  };

  var task = _task.set;
  var microtask = _microtask();




  var PROMISE = 'Promise';
  var TypeError$1 = _global.TypeError;
  var process$2 = _global.process;
  var versions = process$2 && process$2.versions;
  var v8 = versions && versions.v8 || '';
  var $Promise = _global[PROMISE];
  var isNode$1 = _classof(process$2) == 'process';
  var empty = function () { /* empty */ };
  var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
  var newPromiseCapability = newGenericPromiseCapability = _newPromiseCapability.f;

  var USE_NATIVE = !!function () {
    try {
      // correct subclassing with @@species support
      var promise = $Promise.resolve(1);
      var FakePromise = (promise.constructor = {})[_wks('species')] = function (exec) {
        exec(empty, empty);
      };
      // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
      return (isNode$1 || typeof PromiseRejectionEvent == 'function')
        && promise.then(empty) instanceof FakePromise
        // v8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
        // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
        // we can't detect it synchronously, so just check versions
        && v8.indexOf('6.6') !== 0
        && _userAgent.indexOf('Chrome/66') === -1;
    } catch (e) { /* empty */ }
  }();

  // helpers
  var isThenable = function (it) {
    var then;
    return _isObject(it) && typeof (then = it.then) == 'function' ? then : false;
  };
  var notify = function (promise, isReject) {
    if (promise._n) return;
    promise._n = true;
    var chain = promise._c;
    microtask(function () {
      var value = promise._v;
      var ok = promise._s == 1;
      var i = 0;
      var run = function (reaction) {
        var handler = ok ? reaction.ok : reaction.fail;
        var resolve = reaction.resolve;
        var reject = reaction.reject;
        var domain = reaction.domain;
        var result, then, exited;
        try {
          if (handler) {
            if (!ok) {
              if (promise._h == 2) onHandleUnhandled(promise);
              promise._h = 1;
            }
            if (handler === true) result = value;
            else {
              if (domain) domain.enter();
              result = handler(value); // may throw
              if (domain) {
                domain.exit();
                exited = true;
              }
            }
            if (result === reaction.promise) {
              reject(TypeError$1('Promise-chain cycle'));
            } else if (then = isThenable(result)) {
              then.call(result, resolve, reject);
            } else resolve(result);
          } else reject(value);
        } catch (e) {
          if (domain && !exited) domain.exit();
          reject(e);
        }
      };
      while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
      promise._c = [];
      promise._n = false;
      if (isReject && !promise._h) onUnhandled(promise);
    });
  };
  var onUnhandled = function (promise) {
    task.call(_global, function () {
      var value = promise._v;
      var unhandled = isUnhandled(promise);
      var result, handler, console;
      if (unhandled) {
        result = _perform(function () {
          if (isNode$1) {
            process$2.emit('unhandledRejection', value, promise);
          } else if (handler = _global.onunhandledrejection) {
            handler({ promise: promise, reason: value });
          } else if ((console = _global.console) && console.error) {
            console.error('Unhandled promise rejection', value);
          }
        });
        // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
        promise._h = isNode$1 || isUnhandled(promise) ? 2 : 1;
      } promise._a = undefined;
      if (unhandled && result.e) throw result.v;
    });
  };
  var isUnhandled = function (promise) {
    return promise._h !== 1 && (promise._a || promise._c).length === 0;
  };
  var onHandleUnhandled = function (promise) {
    task.call(_global, function () {
      var handler;
      if (isNode$1) {
        process$2.emit('rejectionHandled', promise);
      } else if (handler = _global.onrejectionhandled) {
        handler({ promise: promise, reason: promise._v });
      }
    });
  };
  var $reject = function (value) {
    var promise = this;
    if (promise._d) return;
    promise._d = true;
    promise = promise._w || promise; // unwrap
    promise._v = value;
    promise._s = 2;
    if (!promise._a) promise._a = promise._c.slice();
    notify(promise, true);
  };
  var $resolve = function (value) {
    var promise = this;
    var then;
    if (promise._d) return;
    promise._d = true;
    promise = promise._w || promise; // unwrap
    try {
      if (promise === value) throw TypeError$1("Promise can't be resolved itself");
      if (then = isThenable(value)) {
        microtask(function () {
          var wrapper = { _w: promise, _d: false }; // wrap
          try {
            then.call(value, _ctx($resolve, wrapper, 1), _ctx($reject, wrapper, 1));
          } catch (e) {
            $reject.call(wrapper, e);
          }
        });
      } else {
        promise._v = value;
        promise._s = 1;
        notify(promise, false);
      }
    } catch (e) {
      $reject.call({ _w: promise, _d: false }, e); // wrap
    }
  };

  // constructor polyfill
  if (!USE_NATIVE) {
    // 25.4.3.1 Promise(executor)
    $Promise = function Promise(executor) {
      _anInstance(this, $Promise, PROMISE, '_h');
      _aFunction(executor);
      Internal.call(this);
      try {
        executor(_ctx($resolve, this, 1), _ctx($reject, this, 1));
      } catch (err) {
        $reject.call(this, err);
      }
    };
    // eslint-disable-next-line no-unused-vars
    Internal = function Promise(executor) {
      this._c = [];             // <- awaiting reactions
      this._a = undefined;      // <- checked in isUnhandled reactions
      this._s = 0;              // <- state
      this._d = false;          // <- done
      this._v = undefined;      // <- value
      this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
      this._n = false;          // <- notify
    };
    Internal.prototype = _redefineAll($Promise.prototype, {
      // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
      then: function then(onFulfilled, onRejected) {
        var reaction = newPromiseCapability(_speciesConstructor(this, $Promise));
        reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
        reaction.fail = typeof onRejected == 'function' && onRejected;
        reaction.domain = isNode$1 ? process$2.domain : undefined;
        this._c.push(reaction);
        if (this._a) this._a.push(reaction);
        if (this._s) notify(this, false);
        return reaction.promise;
      },
      // 25.4.5.1 Promise.prototype.catch(onRejected)
      'catch': function (onRejected) {
        return this.then(undefined, onRejected);
      }
    });
    OwnPromiseCapability = function () {
      var promise = new Internal();
      this.promise = promise;
      this.resolve = _ctx($resolve, promise, 1);
      this.reject = _ctx($reject, promise, 1);
    };
    _newPromiseCapability.f = newPromiseCapability = function (C) {
      return C === $Promise || C === Wrapper
        ? new OwnPromiseCapability(C)
        : newGenericPromiseCapability(C);
    };
  }

  _export(_export.G + _export.W + _export.F * !USE_NATIVE, { Promise: $Promise });
  _setToStringTag($Promise, PROMISE);
  _setSpecies(PROMISE);
  Wrapper = _core[PROMISE];

  // statics
  _export(_export.S + _export.F * !USE_NATIVE, PROMISE, {
    // 25.4.4.5 Promise.reject(r)
    reject: function reject(r) {
      var capability = newPromiseCapability(this);
      var $$reject = capability.reject;
      $$reject(r);
      return capability.promise;
    }
  });
  _export(_export.S + _export.F * (_library || !USE_NATIVE), PROMISE, {
    // 25.4.4.6 Promise.resolve(x)
    resolve: function resolve(x) {
      return _promiseResolve(_library && this === Wrapper ? $Promise : this, x);
    }
  });
  _export(_export.S + _export.F * !(USE_NATIVE && _iterDetect(function (iter) {
    $Promise.all(iter)['catch'](empty);
  })), PROMISE, {
    // 25.4.4.1 Promise.all(iterable)
    all: function all(iterable) {
      var C = this;
      var capability = newPromiseCapability(C);
      var resolve = capability.resolve;
      var reject = capability.reject;
      var result = _perform(function () {
        var values = [];
        var index = 0;
        var remaining = 1;
        _forOf(iterable, false, function (promise) {
          var $index = index++;
          var alreadyCalled = false;
          values.push(undefined);
          remaining++;
          C.resolve(promise).then(function (value) {
            if (alreadyCalled) return;
            alreadyCalled = true;
            values[$index] = value;
            --remaining || resolve(values);
          }, reject);
        });
        --remaining || resolve(values);
      });
      if (result.e) reject(result.v);
      return capability.promise;
    },
    // 25.4.4.4 Promise.race(iterable)
    race: function race(iterable) {
      var C = this;
      var capability = newPromiseCapability(C);
      var reject = capability.reject;
      var result = _perform(function () {
        _forOf(iterable, false, function (promise) {
          C.resolve(promise).then(capability.resolve, reject);
        });
      });
      if (result.e) reject(result.v);
      return capability.promise;
    }
  });

  _export(_export.P + _export.R, 'Promise', { 'finally': function (onFinally) {
    var C = _speciesConstructor(this, _core.Promise || _global.Promise);
    var isFunction = typeof onFinally == 'function';
    return this.then(
      isFunction ? function (x) {
        return _promiseResolve(C, onFinally()).then(function () { return x; });
      } : onFinally,
      isFunction ? function (e) {
        return _promiseResolve(C, onFinally()).then(function () { throw e; });
      } : onFinally
    );
  } });

  // https://github.com/tc39/proposal-promise-try




  _export(_export.S, 'Promise', { 'try': function (callbackfn) {
    var promiseCapability = _newPromiseCapability.f(this);
    var result = _perform(callbackfn);
    (result.e ? promiseCapability.reject : promiseCapability.resolve)(result.v);
    return promiseCapability.promise;
  } });

  var promise = _core.Promise;

  var promise$1 = promise;

  // 7.2.2 IsArray(argument)

  var _isArray = Array.isArray || function isArray(arg) {
    return _cof(arg) == 'Array';
  };

  // 22.1.2.2 / 15.4.3.2 Array.isArray(arg)


  _export(_export.S, 'Array', { isArray: _isArray });

  var isArray = _core.Array.isArray;

  var isArray$1 = isArray;

  function _arrayWithoutHoles(arr) {
    if (isArray$1(arr)) {
      for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
        arr2[i] = arr[i];
      }

      return arr2;
    }
  }

  var _createProperty = function (object, index, value) {
    if (index in object) _objectDp.f(object, index, _propertyDesc(0, value));
    else object[index] = value;
  };

  _export(_export.S + _export.F * !_iterDetect(function (iter) { }), 'Array', {
    // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
    from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
      var O = _toObject(arrayLike);
      var C = typeof this == 'function' ? this : Array;
      var aLen = arguments.length;
      var mapfn = aLen > 1 ? arguments[1] : undefined;
      var mapping = mapfn !== undefined;
      var index = 0;
      var iterFn = core_getIteratorMethod(O);
      var length, result, step, iterator;
      if (mapping) mapfn = _ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
      // if object isn't iterable or it's array with default iterator - use simple case
      if (iterFn != undefined && !(C == Array && _isArrayIter(iterFn))) {
        for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
          _createProperty(result, index, mapping ? _iterCall(iterator, mapfn, [step.value, index], true) : step.value);
        }
      } else {
        length = _toLength(O.length);
        for (result = new C(length); length > index; index++) {
          _createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
        }
      }
      result.length = index;
      return result;
    }
  });

  var from_1 = _core.Array.from;

  var from_1$1 = from_1;

  var ITERATOR$4 = _wks('iterator');

  var core_isIterable = _core.isIterable = function (it) {
    var O = Object(it);
    return O[ITERATOR$4] !== undefined
      || '@@iterator' in O
      // eslint-disable-next-line no-prototype-builtins
      || _iterators.hasOwnProperty(_classof(O));
  };

  var isIterable = core_isIterable;

  var isIterable$1 = isIterable;

  function _iterableToArray(iter) {
    if (isIterable$1(Object(iter)) || Object.prototype.toString.call(iter) === "[object Arguments]") return from_1$1(iter);
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance");
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
  }

  var f$2 = _wks;

  var _wksExt = {
  	f: f$2
  };

  var iterator = _wksExt.f('iterator');

  var iterator$1 = iterator;

  var _meta = createCommonjsModule(function (module) {
  var META = _uid('meta');


  var setDesc = _objectDp.f;
  var id = 0;
  var isExtensible = Object.isExtensible || function () {
    return true;
  };
  var FREEZE = !_fails(function () {
    return isExtensible(Object.preventExtensions({}));
  });
  var setMeta = function (it) {
    setDesc(it, META, { value: {
      i: 'O' + ++id, // object ID
      w: {}          // weak collections IDs
    } });
  };
  var fastKey = function (it, create) {
    // return primitive with prefix
    if (!_isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
    if (!_has(it, META)) {
      // can't set metadata to uncaught frozen object
      if (!isExtensible(it)) return 'F';
      // not necessary to add metadata
      if (!create) return 'E';
      // add missing metadata
      setMeta(it);
    // return object ID
    } return it[META].i;
  };
  var getWeak = function (it, create) {
    if (!_has(it, META)) {
      // can't set metadata to uncaught frozen object
      if (!isExtensible(it)) return true;
      // not necessary to add metadata
      if (!create) return false;
      // add missing metadata
      setMeta(it);
    // return hash weak collections IDs
    } return it[META].w;
  };
  // add metadata on freeze-family methods calling
  var onFreeze = function (it) {
    if (FREEZE && meta.NEED && isExtensible(it) && !_has(it, META)) setMeta(it);
    return it;
  };
  var meta = module.exports = {
    KEY: META,
    NEED: false,
    fastKey: fastKey,
    getWeak: getWeak,
    onFreeze: onFreeze
  };
  });
  var _meta_1 = _meta.KEY;
  var _meta_2 = _meta.NEED;
  var _meta_3 = _meta.fastKey;
  var _meta_4 = _meta.getWeak;
  var _meta_5 = _meta.onFreeze;

  var defineProperty = _objectDp.f;
  var _wksDefine = function (name) {
    var $Symbol = _core.Symbol || (_core.Symbol = {});
    if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: _wksExt.f(name) });
  };

  var f$3 = Object.getOwnPropertySymbols;

  var _objectGops = {
  	f: f$3
  };

  var f$4 = {}.propertyIsEnumerable;

  var _objectPie = {
  	f: f$4
  };

  // all enumerable object keys, includes symbols



  var _enumKeys = function (it) {
    var result = _objectKeys(it);
    var getSymbols = _objectGops.f;
    if (getSymbols) {
      var symbols = getSymbols(it);
      var isEnum = _objectPie.f;
      var i = 0;
      var key;
      while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
    } return result;
  };

  // 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)

  var hiddenKeys = _enumBugKeys.concat('length', 'prototype');

  var f$5 = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
    return _objectKeysInternal(O, hiddenKeys);
  };

  var _objectGopn = {
  	f: f$5
  };

  // fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window

  var gOPN = _objectGopn.f;
  var toString$1 = {}.toString;

  var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
    ? Object.getOwnPropertyNames(window) : [];

  var getWindowNames = function (it) {
    try {
      return gOPN(it);
    } catch (e) {
      return windowNames.slice();
    }
  };

  var f$6 = function getOwnPropertyNames(it) {
    return windowNames && toString$1.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(_toIobject(it));
  };

  var _objectGopnExt = {
  	f: f$6
  };

  var gOPD = Object.getOwnPropertyDescriptor;

  var f$7 = _descriptors ? gOPD : function getOwnPropertyDescriptor(O, P) {
    O = _toIobject(O);
    P = _toPrimitive(P, true);
    if (_ie8DomDefine) try {
      return gOPD(O, P);
    } catch (e) { /* empty */ }
    if (_has(O, P)) return _propertyDesc(!_objectPie.f.call(O, P), O[P]);
  };

  var _objectGopd = {
  	f: f$7
  };

  // ECMAScript 6 symbols shim





  var META = _meta.KEY;



















  var gOPD$1 = _objectGopd.f;
  var dP$1 = _objectDp.f;
  var gOPN$1 = _objectGopnExt.f;
  var $Symbol = _global.Symbol;
  var $JSON = _global.JSON;
  var _stringify = $JSON && $JSON.stringify;
  var PROTOTYPE$2 = 'prototype';
  var HIDDEN = _wks('_hidden');
  var TO_PRIMITIVE = _wks('toPrimitive');
  var isEnum = {}.propertyIsEnumerable;
  var SymbolRegistry = _shared('symbol-registry');
  var AllSymbols = _shared('symbols');
  var OPSymbols = _shared('op-symbols');
  var ObjectProto$1 = Object[PROTOTYPE$2];
  var USE_NATIVE$1 = typeof $Symbol == 'function';
  var QObject = _global.QObject;
  // Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
  var setter = !QObject || !QObject[PROTOTYPE$2] || !QObject[PROTOTYPE$2].findChild;

  // fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
  var setSymbolDesc = _descriptors && _fails(function () {
    return _objectCreate(dP$1({}, 'a', {
      get: function () { return dP$1(this, 'a', { value: 7 }).a; }
    })).a != 7;
  }) ? function (it, key, D) {
    var protoDesc = gOPD$1(ObjectProto$1, key);
    if (protoDesc) delete ObjectProto$1[key];
    dP$1(it, key, D);
    if (protoDesc && it !== ObjectProto$1) dP$1(ObjectProto$1, key, protoDesc);
  } : dP$1;

  var wrap = function (tag) {
    var sym = AllSymbols[tag] = _objectCreate($Symbol[PROTOTYPE$2]);
    sym._k = tag;
    return sym;
  };

  var isSymbol = USE_NATIVE$1 && typeof $Symbol.iterator == 'symbol' ? function (it) {
    return typeof it == 'symbol';
  } : function (it) {
    return it instanceof $Symbol;
  };

  var $defineProperty = function defineProperty(it, key, D) {
    if (it === ObjectProto$1) $defineProperty(OPSymbols, key, D);
    _anObject(it);
    key = _toPrimitive(key, true);
    _anObject(D);
    if (_has(AllSymbols, key)) {
      if (!D.enumerable) {
        if (!_has(it, HIDDEN)) dP$1(it, HIDDEN, _propertyDesc(1, {}));
        it[HIDDEN][key] = true;
      } else {
        if (_has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
        D = _objectCreate(D, { enumerable: _propertyDesc(0, false) });
      } return setSymbolDesc(it, key, D);
    } return dP$1(it, key, D);
  };
  var $defineProperties = function defineProperties(it, P) {
    _anObject(it);
    var keys = _enumKeys(P = _toIobject(P));
    var i = 0;
    var l = keys.length;
    var key;
    while (l > i) $defineProperty(it, key = keys[i++], P[key]);
    return it;
  };
  var $create = function create(it, P) {
    return P === undefined ? _objectCreate(it) : $defineProperties(_objectCreate(it), P);
  };
  var $propertyIsEnumerable = function propertyIsEnumerable(key) {
    var E = isEnum.call(this, key = _toPrimitive(key, true));
    if (this === ObjectProto$1 && _has(AllSymbols, key) && !_has(OPSymbols, key)) return false;
    return E || !_has(this, key) || !_has(AllSymbols, key) || _has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
  };
  var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
    it = _toIobject(it);
    key = _toPrimitive(key, true);
    if (it === ObjectProto$1 && _has(AllSymbols, key) && !_has(OPSymbols, key)) return;
    var D = gOPD$1(it, key);
    if (D && _has(AllSymbols, key) && !(_has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
    return D;
  };
  var $getOwnPropertyNames = function getOwnPropertyNames(it) {
    var names = gOPN$1(_toIobject(it));
    var result = [];
    var i = 0;
    var key;
    while (names.length > i) {
      if (!_has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
    } return result;
  };
  var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
    var IS_OP = it === ObjectProto$1;
    var names = gOPN$1(IS_OP ? OPSymbols : _toIobject(it));
    var result = [];
    var i = 0;
    var key;
    while (names.length > i) {
      if (_has(AllSymbols, key = names[i++]) && (IS_OP ? _has(ObjectProto$1, key) : true)) result.push(AllSymbols[key]);
    } return result;
  };

  // 19.4.1.1 Symbol([description])
  if (!USE_NATIVE$1) {
    $Symbol = function Symbol() {
      if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
      var tag = _uid(arguments.length > 0 ? arguments[0] : undefined);
      var $set = function (value) {
        if (this === ObjectProto$1) $set.call(OPSymbols, value);
        if (_has(this, HIDDEN) && _has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
        setSymbolDesc(this, tag, _propertyDesc(1, value));
      };
      if (_descriptors && setter) setSymbolDesc(ObjectProto$1, tag, { configurable: true, set: $set });
      return wrap(tag);
    };
    _redefine($Symbol[PROTOTYPE$2], 'toString', function toString() {
      return this._k;
    });

    _objectGopd.f = $getOwnPropertyDescriptor;
    _objectDp.f = $defineProperty;
    _objectGopn.f = _objectGopnExt.f = $getOwnPropertyNames;
    _objectPie.f = $propertyIsEnumerable;
    _objectGops.f = $getOwnPropertySymbols;

    if (_descriptors && !_library) {
      _redefine(ObjectProto$1, 'propertyIsEnumerable', $propertyIsEnumerable, true);
    }

    _wksExt.f = function (name) {
      return wrap(_wks(name));
    };
  }

  _export(_export.G + _export.W + _export.F * !USE_NATIVE$1, { Symbol: $Symbol });

  for (var es6Symbols = (
    // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
    'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
  ).split(','), j = 0; es6Symbols.length > j;)_wks(es6Symbols[j++]);

  for (var wellKnownSymbols = _objectKeys(_wks.store), k = 0; wellKnownSymbols.length > k;) _wksDefine(wellKnownSymbols[k++]);

  _export(_export.S + _export.F * !USE_NATIVE$1, 'Symbol', {
    // 19.4.2.1 Symbol.for(key)
    'for': function (key) {
      return _has(SymbolRegistry, key += '')
        ? SymbolRegistry[key]
        : SymbolRegistry[key] = $Symbol(key);
    },
    // 19.4.2.5 Symbol.keyFor(sym)
    keyFor: function keyFor(sym) {
      if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
      for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
    },
    useSetter: function () { setter = true; },
    useSimple: function () { setter = false; }
  });

  _export(_export.S + _export.F * !USE_NATIVE$1, 'Object', {
    // 19.1.2.2 Object.create(O [, Properties])
    create: $create,
    // 19.1.2.4 Object.defineProperty(O, P, Attributes)
    defineProperty: $defineProperty,
    // 19.1.2.3 Object.defineProperties(O, Properties)
    defineProperties: $defineProperties,
    // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
    getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
    // 19.1.2.7 Object.getOwnPropertyNames(O)
    getOwnPropertyNames: $getOwnPropertyNames,
    // 19.1.2.8 Object.getOwnPropertySymbols(O)
    getOwnPropertySymbols: $getOwnPropertySymbols
  });

  // 24.3.2 JSON.stringify(value [, replacer [, space]])
  $JSON && _export(_export.S + _export.F * (!USE_NATIVE$1 || _fails(function () {
    var S = $Symbol();
    // MS Edge converts symbol values to JSON as {}
    // WebKit converts symbol values to JSON as null
    // V8 throws on boxed symbols
    return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
  })), 'JSON', {
    stringify: function stringify(it) {
      var args = [it];
      var i = 1;
      var replacer, $replacer;
      while (arguments.length > i) args.push(arguments[i++]);
      $replacer = replacer = args[1];
      if (!_isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
      if (!_isArray(replacer)) replacer = function (key, value) {
        if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
        if (!isSymbol(value)) return value;
      };
      args[1] = replacer;
      return _stringify.apply($JSON, args);
    }
  });

  // 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
  $Symbol[PROTOTYPE$2][TO_PRIMITIVE] || _hide($Symbol[PROTOTYPE$2], TO_PRIMITIVE, $Symbol[PROTOTYPE$2].valueOf);
  // 19.4.3.5 Symbol.prototype[@@toStringTag]
  _setToStringTag($Symbol, 'Symbol');
  // 20.2.1.9 Math[@@toStringTag]
  _setToStringTag(Math, 'Math', true);
  // 24.3.3 JSON[@@toStringTag]
  _setToStringTag(_global.JSON, 'JSON', true);

  _wksDefine('asyncIterator');

  _wksDefine('observable');

  var symbol = _core.Symbol;

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

  var _global$1 = createCommonjsModule(function (module) {
  // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
  var global = module.exports = typeof window != 'undefined' && window.Math == Math
    ? window : typeof self != 'undefined' && self.Math == Math ? self
    // eslint-disable-next-line no-new-func
    : Function('return this')();
  if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef
  });

  var _core$1 = createCommonjsModule(function (module) {
  var core = module.exports = { version: '2.6.1' };
  if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef
  });
  var _core_1$1 = _core$1.version;

  var _isObject$1 = function (it) {
    return typeof it === 'object' ? it !== null : typeof it === 'function';
  };

  var _anObject$1 = function (it) {
    if (!_isObject$1(it)) throw TypeError(it + ' is not an object!');
    return it;
  };

  var _fails$1 = function (exec) {
    try {
      return !!exec();
    } catch (e) {
      return true;
    }
  };

  // Thank's IE8 for his funny defineProperty
  var _descriptors$1 = !_fails$1(function () {
    return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
  });

  var document$3 = _global$1.document;
  // typeof document.createElement is 'object' in old IE
  var is$1 = _isObject$1(document$3) && _isObject$1(document$3.createElement);
  var _domCreate$1 = function (it) {
    return is$1 ? document$3.createElement(it) : {};
  };

  var _ie8DomDefine$1 = !_descriptors$1 && !_fails$1(function () {
    return Object.defineProperty(_domCreate$1('div'), 'a', { get: function () { return 7; } }).a != 7;
  });

  // 7.1.1 ToPrimitive(input [, PreferredType])

  // instead of the ES6 spec version, we didn't implement @@toPrimitive case
  // and the second argument - flag - preferred type is a string
  var _toPrimitive$1 = function (it, S) {
    if (!_isObject$1(it)) return it;
    var fn, val;
    if (S && typeof (fn = it.toString) == 'function' && !_isObject$1(val = fn.call(it))) return val;
    if (typeof (fn = it.valueOf) == 'function' && !_isObject$1(val = fn.call(it))) return val;
    if (!S && typeof (fn = it.toString) == 'function' && !_isObject$1(val = fn.call(it))) return val;
    throw TypeError("Can't convert object to primitive value");
  };

  var dP$2 = Object.defineProperty;

  var f$8 = _descriptors$1 ? Object.defineProperty : function defineProperty(O, P, Attributes) {
    _anObject$1(O);
    P = _toPrimitive$1(P, true);
    _anObject$1(Attributes);
    if (_ie8DomDefine$1) try {
      return dP$2(O, P, Attributes);
    } catch (e) { /* empty */ }
    if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
    if ('value' in Attributes) O[P] = Attributes.value;
    return O;
  };

  var _objectDp$1 = {
  	f: f$8
  };

  var _propertyDesc$1 = function (bitmap, value) {
    return {
      enumerable: !(bitmap & 1),
      configurable: !(bitmap & 2),
      writable: !(bitmap & 4),
      value: value
    };
  };

  var _hide$1 = _descriptors$1 ? function (object, key, value) {
    return _objectDp$1.f(object, key, _propertyDesc$1(1, value));
  } : function (object, key, value) {
    object[key] = value;
    return object;
  };

  var hasOwnProperty$1 = {}.hasOwnProperty;
  var _has$1 = function (it, key) {
    return hasOwnProperty$1.call(it, key);
  };

  var id$1 = 0;
  var px$1 = Math.random();
  var _uid$1 = function (key) {
    return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id$1 + px$1).toString(36));
  };

  var _redefine$1 = createCommonjsModule(function (module) {
  var SRC = _uid$1('src');
  var TO_STRING = 'toString';
  var $toString = Function[TO_STRING];
  var TPL = ('' + $toString).split(TO_STRING);

  _core$1.inspectSource = function (it) {
    return $toString.call(it);
  };

  (module.exports = function (O, key, val, safe) {
    var isFunction = typeof val == 'function';
    if (isFunction) _has$1(val, 'name') || _hide$1(val, 'name', key);
    if (O[key] === val) return;
    if (isFunction) _has$1(val, SRC) || _hide$1(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
    if (O === _global$1) {
      O[key] = val;
    } else if (!safe) {
      delete O[key];
      _hide$1(O, key, val);
    } else if (O[key]) {
      O[key] = val;
    } else {
      _hide$1(O, key, val);
    }
  // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
  })(Function.prototype, TO_STRING, function toString() {
    return typeof this == 'function' && this[SRC] || $toString.call(this);
  });
  });

  var _aFunction$1 = function (it) {
    if (typeof it != 'function') throw TypeError(it + ' is not a function!');
    return it;
  };

  // optional / simple context binding

  var _ctx$1 = function (fn, that, length) {
    _aFunction$1(fn);
    if (that === undefined) return fn;
    switch (length) {
      case 1: return function (a) {
        return fn.call(that, a);
      };
      case 2: return function (a, b) {
        return fn.call(that, a, b);
      };
      case 3: return function (a, b, c) {
        return fn.call(that, a, b, c);
      };
    }
    return function (/* ...args */) {
      return fn.apply(that, arguments);
    };
  };

  var PROTOTYPE$3 = 'prototype';

  var $export$1 = function (type, name, source) {
    var IS_FORCED = type & $export$1.F;
    var IS_GLOBAL = type & $export$1.G;
    var IS_STATIC = type & $export$1.S;
    var IS_PROTO = type & $export$1.P;
    var IS_BIND = type & $export$1.B;
    var target = IS_GLOBAL ? _global$1 : IS_STATIC ? _global$1[name] || (_global$1[name] = {}) : (_global$1[name] || {})[PROTOTYPE$3];
    var exports = IS_GLOBAL ? _core$1 : _core$1[name] || (_core$1[name] = {});
    var expProto = exports[PROTOTYPE$3] || (exports[PROTOTYPE$3] = {});
    var key, own, out, exp;
    if (IS_GLOBAL) source = name;
    for (key in source) {
      // contains in native
      own = !IS_FORCED && target && target[key] !== undefined;
      // export native or passed
      out = (own ? target : source)[key];
      // bind timers to global for call from export context
      exp = IS_BIND && own ? _ctx$1(out, _global$1) : IS_PROTO && typeof out == 'function' ? _ctx$1(Function.call, out) : out;
      // extend global
      if (target) _redefine$1(target, key, out, type & $export$1.U);
      // export
      if (exports[key] != out) _hide$1(exports, key, exp);
      if (IS_PROTO && expProto[key] != out) expProto[key] = out;
    }
  };
  _global$1.core = _core$1;
  // type bitmap
  $export$1.F = 1;   // forced
  $export$1.G = 2;   // global
  $export$1.S = 4;   // static
  $export$1.P = 8;   // proto
  $export$1.B = 16;  // bind
  $export$1.W = 32;  // wrap
  $export$1.U = 64;  // safe
  $export$1.R = 128; // real proto method for `library`
  var _export$1 = $export$1;

  var toString$2 = {}.toString;

  var _cof$1 = function (it) {
    return toString$2.call(it).slice(8, -1);
  };

  // fallback for non-array-like ES3 and non-enumerable old V8 strings

  // eslint-disable-next-line no-prototype-builtins
  var _iobject$1 = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
    return _cof$1(it) == 'String' ? it.split('') : Object(it);
  };

  // 7.2.1 RequireObjectCoercible(argument)
  var _defined$1 = function (it) {
    if (it == undefined) throw TypeError("Can't call method on  " + it);
    return it;
  };

  // 7.1.13 ToObject(argument)

  var _toObject$1 = function (it) {
    return Object(_defined$1(it));
  };

  // 7.1.4 ToInteger
  var ceil$1 = Math.ceil;
  var floor$1 = Math.floor;
  var _toInteger$1 = function (it) {
    return isNaN(it = +it) ? 0 : (it > 0 ? floor$1 : ceil$1)(it);
  };

  // 7.1.15 ToLength

  var min$2 = Math.min;
  var _toLength$1 = function (it) {
    return it > 0 ? min$2(_toInteger$1(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
  };

  // 7.2.2 IsArray(argument)

  var _isArray$1 = Array.isArray || function isArray(arg) {
    return _cof$1(arg) == 'Array';
  };

  var _library$1 = false;

  var _shared$1 = createCommonjsModule(function (module) {
  var SHARED = '__core-js_shared__';
  var store = _global$1[SHARED] || (_global$1[SHARED] = {});

  (module.exports = function (key, value) {
    return store[key] || (store[key] = value !== undefined ? value : {});
  })('versions', []).push({
    version: _core$1.version,
    mode: 'global',
    copyright: '© 2018 Denis Pushkarev (zloirock.ru)'
  });
  });

  var _wks$1 = createCommonjsModule(function (module) {
  var store = _shared$1('wks');

  var Symbol = _global$1.Symbol;
  var USE_SYMBOL = typeof Symbol == 'function';

  var $exports = module.exports = function (name) {
    return store[name] || (store[name] =
      USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : _uid$1)('Symbol.' + name));
  };

  $exports.store = store;
  });

  var SPECIES$2 = _wks$1('species');

  var _arraySpeciesConstructor = function (original) {
    var C;
    if (_isArray$1(original)) {
      C = original.constructor;
      // cross-realm fallback
      if (typeof C == 'function' && (C === Array || _isArray$1(C.prototype))) C = undefined;
      if (_isObject$1(C)) {
        C = C[SPECIES$2];
        if (C === null) C = undefined;
      }
    } return C === undefined ? Array : C;
  };

  // 9.4.2.3 ArraySpeciesCreate(originalArray, length)


  var _arraySpeciesCreate = function (original, length) {
    return new (_arraySpeciesConstructor(original))(length);
  };

  // 0 -> Array#forEach
  // 1 -> Array#map
  // 2 -> Array#filter
  // 3 -> Array#some
  // 4 -> Array#every
  // 5 -> Array#find
  // 6 -> Array#findIndex





  var _arrayMethods = function (TYPE, $create) {
    var IS_MAP = TYPE == 1;
    var IS_FILTER = TYPE == 2;
    var IS_SOME = TYPE == 3;
    var IS_EVERY = TYPE == 4;
    var IS_FIND_INDEX = TYPE == 6;
    var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
    var create = $create || _arraySpeciesCreate;
    return function ($this, callbackfn, that) {
      var O = _toObject$1($this);
      var self = _iobject$1(O);
      var f = _ctx$1(callbackfn, that, 3);
      var length = _toLength$1(self.length);
      var index = 0;
      var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
      var val, res;
      for (;length > index; index++) if (NO_HOLES || index in self) {
        val = self[index];
        res = f(val, index, O);
        if (TYPE) {
          if (IS_MAP) result[index] = res;   // map
          else if (res) switch (TYPE) {
            case 3: return true;             // some
            case 5: return val;              // find
            case 6: return index;            // findIndex
            case 2: result.push(val);        // filter
          } else if (IS_EVERY) return false; // every
        }
      }
      return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
    };
  };

  // 22.1.3.31 Array.prototype[@@unscopables]
  var UNSCOPABLES = _wks$1('unscopables');
  var ArrayProto$1 = Array.prototype;
  if (ArrayProto$1[UNSCOPABLES] == undefined) _hide$1(ArrayProto$1, UNSCOPABLES, {});
  var _addToUnscopables$1 = function (key) {
    ArrayProto$1[UNSCOPABLES][key] = true;
  };

  // 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)

  var $find = _arrayMethods(5);
  var KEY = 'find';
  var forced = true;
  // Shouldn't skip holes
  if (KEY in []) Array(1)[KEY](function () { forced = false; });
  _export$1(_export$1.P + _export$1.F * forced, 'Array', {
    find: function find(callbackfn /* , that = undefined */) {
      return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    }
  });
  _addToUnscopables$1(KEY);

  var f$9 = {}.propertyIsEnumerable;

  var _objectPie$1 = {
  	f: f$9
  };

  // to indexed object, toObject with fallback for non-array-like ES3 strings


  var _toIobject$1 = function (it) {
    return _iobject$1(_defined$1(it));
  };

  var gOPD$2 = Object.getOwnPropertyDescriptor;

  var f$a = _descriptors$1 ? gOPD$2 : function getOwnPropertyDescriptor(O, P) {
    O = _toIobject$1(O);
    P = _toPrimitive$1(P, true);
    if (_ie8DomDefine$1) try {
      return gOPD$2(O, P);
    } catch (e) { /* empty */ }
    if (_has$1(O, P)) return _propertyDesc$1(!_objectPie$1.f.call(O, P), O[P]);
  };

  var _objectGopd$1 = {
  	f: f$a
  };

  // Works with __proto__ only. Old v8 can't work with null proto objects.
  /* eslint-disable no-proto */


  var check = function (O, proto) {
    _anObject$1(O);
    if (!_isObject$1(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
  };
  var _setProto = {
    set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
      function (test, buggy, set) {
        try {
          set = _ctx$1(Function.call, _objectGopd$1.f(Object.prototype, '__proto__').set, 2);
          set(test, []);
          buggy = !(test instanceof Array);
        } catch (e) { buggy = true; }
        return function setPrototypeOf(O, proto) {
          check(O, proto);
          if (buggy) O.__proto__ = proto;
          else set(O, proto);
          return O;
        };
      }({}, false) : undefined),
    check: check
  };

  var setPrototypeOf = _setProto.set;
  var _inheritIfRequired = function (that, target, C) {
    var S = target.constructor;
    var P;
    if (S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && _isObject$1(P) && setPrototypeOf) {
      setPrototypeOf(that, P);
    } return that;
  };

  var max$1 = Math.max;
  var min$3 = Math.min;
  var _toAbsoluteIndex$1 = function (index, length) {
    index = _toInteger$1(index);
    return index < 0 ? max$1(index + length, 0) : min$3(index, length);
  };

  // false -> Array#indexOf
  // true  -> Array#includes



  var _arrayIncludes$1 = function (IS_INCLUDES) {
    return function ($this, el, fromIndex) {
      var O = _toIobject$1($this);
      var length = _toLength$1(O.length);
      var index = _toAbsoluteIndex$1(fromIndex, length);
      var value;
      // Array#includes uses SameValueZero equality algorithm
      // eslint-disable-next-line no-self-compare
      if (IS_INCLUDES && el != el) while (length > index) {
        value = O[index++];
        // eslint-disable-next-line no-self-compare
        if (value != value) return true;
      // Array#indexOf ignores holes, Array#includes - not
      } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
        if (O[index] === el) return IS_INCLUDES || index || 0;
      } return !IS_INCLUDES && -1;
    };
  };

  var shared$1 = _shared$1('keys');

  var _sharedKey$1 = function (key) {
    return shared$1[key] || (shared$1[key] = _uid$1(key));
  };

  var arrayIndexOf$1 = _arrayIncludes$1(false);
  var IE_PROTO$3 = _sharedKey$1('IE_PROTO');

  var _objectKeysInternal$1 = function (object, names) {
    var O = _toIobject$1(object);
    var i = 0;
    var result = [];
    var key;
    for (key in O) if (key != IE_PROTO$3) _has$1(O, key) && result.push(key);
    // Don't enum bug & hidden keys
    while (names.length > i) if (_has$1(O, key = names[i++])) {
      ~arrayIndexOf$1(result, key) || result.push(key);
    }
    return result;
  };

  // IE 8- don't enum bug keys
  var _enumBugKeys$1 = (
    'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
  ).split(',');

  // 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)

  var hiddenKeys$1 = _enumBugKeys$1.concat('length', 'prototype');

  var f$b = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
    return _objectKeysInternal$1(O, hiddenKeys$1);
  };

  var _objectGopn$1 = {
  	f: f$b
  };

  // 7.2.8 IsRegExp(argument)


  var MATCH = _wks$1('match');
  var _isRegexp = function (it) {
    var isRegExp;
    return _isObject$1(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : _cof$1(it) == 'RegExp');
  };

  // 21.2.5.3 get RegExp.prototype.flags

  var _flags = function () {
    var that = _anObject$1(this);
    var result = '';
    if (that.global) result += 'g';
    if (that.ignoreCase) result += 'i';
    if (that.multiline) result += 'm';
    if (that.unicode) result += 'u';
    if (that.sticky) result += 'y';
    return result;
  };

  var SPECIES$3 = _wks$1('species');

  var _setSpecies$1 = function (KEY) {
    var C = _global$1[KEY];
    if (_descriptors$1 && C && !C[SPECIES$3]) _objectDp$1.f(C, SPECIES$3, {
      configurable: true,
      get: function () { return this; }
    });
  };

  var dP$3 = _objectDp$1.f;
  var gOPN$2 = _objectGopn$1.f;


  var $RegExp = _global$1.RegExp;
  var Base = $RegExp;
  var proto$1 = $RegExp.prototype;
  var re1 = /a/g;
  var re2 = /a/g;
  // "new" creates a new object, old webkit buggy here
  var CORRECT_NEW = new $RegExp(re1) !== re1;

  if (_descriptors$1 && (!CORRECT_NEW || _fails$1(function () {
    re2[_wks$1('match')] = false;
    // RegExp constructor can alter flags and IsRegExp works correct with @@match
    return $RegExp(re1) != re1 || $RegExp(re2) == re2 || $RegExp(re1, 'i') != '/a/i';
  }))) {
    $RegExp = function RegExp(p, f) {
      var tiRE = this instanceof $RegExp;
      var piRE = _isRegexp(p);
      var fiU = f === undefined;
      return !tiRE && piRE && p.constructor === $RegExp && fiU ? p
        : _inheritIfRequired(CORRECT_NEW
          ? new Base(piRE && !fiU ? p.source : p, f)
          : Base((piRE = p instanceof $RegExp) ? p.source : p, piRE && fiU ? _flags.call(p) : f)
        , tiRE ? this : proto$1, $RegExp);
    };
    var proxy = function (key) {
      key in $RegExp || dP$3($RegExp, key, {
        configurable: true,
        get: function () { return Base[key]; },
        set: function (it) { Base[key] = it; }
      });
    };
    for (var keys = gOPN$2(Base), i$1 = 0; keys.length > i$1;) proxy(keys[i$1++]);
    proto$1.constructor = $RegExp;
    $RegExp.prototype = proto$1;
    _redefine$1(_global$1, 'RegExp', $RegExp);
  }

  _setSpecies$1('RegExp');

  var runtime = createCommonjsModule(function (module) {
  /**
   * Copyright (c) 2014-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */

  !(function(global) {

    var Op = Object.prototype;
    var hasOwn = Op.hasOwnProperty;
    var undefined; // More compressible than void 0.
    var $Symbol = typeof Symbol === "function" ? Symbol : {};
    var iteratorSymbol = $Symbol.iterator || "@@iterator";
    var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
    var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
    var runtime = global.regeneratorRuntime;
    if (runtime) {
      {
        // If regeneratorRuntime is defined globally and we're in a module,
        // make the exports object identical to regeneratorRuntime.
        module.exports = runtime;
      }
      // Don't bother evaluating the rest of this file if the runtime was
      // already defined globally.
      return;
    }

    // Define the runtime globally (as expected by generated code) as either
    // module.exports (if we're in a module) or a new, empty object.
    runtime = global.regeneratorRuntime = module.exports;

    function wrap(innerFn, outerFn, self, tryLocsList) {
      // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
      var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
      var generator = Object.create(protoGenerator.prototype);
      var context = new Context(tryLocsList || []);

      // The ._invoke method unifies the implementations of the .next,
      // .throw, and .return methods.
      generator._invoke = makeInvokeMethod(innerFn, self, context);

      return generator;
    }
    runtime.wrap = wrap;

    // Try/catch helper to minimize deoptimizations. Returns a completion
    // record like context.tryEntries[i].completion. This interface could
    // have been (and was previously) designed to take a closure to be
    // invoked without arguments, but in all the cases we care about we
    // already have an existing method we want to call, so there's no need
    // to create a new function object. We can even get away with assuming
    // the method takes exactly one argument, since that happens to be true
    // in every case, so we don't have to touch the arguments object. The
    // only additional allocation required is the completion record, which
    // has a stable shape and so hopefully should be cheap to allocate.
    function tryCatch(fn, obj, arg) {
      try {
        return { type: "normal", arg: fn.call(obj, arg) };
      } catch (err) {
        return { type: "throw", arg: err };
      }
    }

    var GenStateSuspendedStart = "suspendedStart";
    var GenStateSuspendedYield = "suspendedYield";
    var GenStateExecuting = "executing";
    var GenStateCompleted = "completed";

    // Returning this object from the innerFn has the same effect as
    // breaking out of the dispatch switch statement.
    var ContinueSentinel = {};

    // Dummy constructor functions that we use as the .constructor and
    // .constructor.prototype properties for functions that return Generator
    // objects. For full spec compliance, you may wish to configure your
    // minifier not to mangle the names of these two functions.
    function Generator() {}
    function GeneratorFunction() {}
    function GeneratorFunctionPrototype() {}

    // This is a polyfill for %IteratorPrototype% for environments that
    // don't natively support it.
    var IteratorPrototype = {};
    IteratorPrototype[iteratorSymbol] = function () {
      return this;
    };

    var getProto = Object.getPrototypeOf;
    var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
    if (NativeIteratorPrototype &&
        NativeIteratorPrototype !== Op &&
        hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
      // This environment has a native %IteratorPrototype%; use it instead
      // of the polyfill.
      IteratorPrototype = NativeIteratorPrototype;
    }

    var Gp = GeneratorFunctionPrototype.prototype =
      Generator.prototype = Object.create(IteratorPrototype);
    GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
    GeneratorFunctionPrototype.constructor = GeneratorFunction;
    GeneratorFunctionPrototype[toStringTagSymbol] =
      GeneratorFunction.displayName = "GeneratorFunction";

    // Helper for defining the .next, .throw, and .return methods of the
    // Iterator interface in terms of a single ._invoke method.
    function defineIteratorMethods(prototype) {
      ["next", "throw", "return"].forEach(function(method) {
        prototype[method] = function(arg) {
          return this._invoke(method, arg);
        };
      });
    }

    runtime.isGeneratorFunction = function(genFun) {
      var ctor = typeof genFun === "function" && genFun.constructor;
      return ctor
        ? ctor === GeneratorFunction ||
          // For the native GeneratorFunction constructor, the best we can
          // do is to check its .name property.
          (ctor.displayName || ctor.name) === "GeneratorFunction"
        : false;
    };

    runtime.mark = function(genFun) {
      if (Object.setPrototypeOf) {
        Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
      } else {
        genFun.__proto__ = GeneratorFunctionPrototype;
        if (!(toStringTagSymbol in genFun)) {
          genFun[toStringTagSymbol] = "GeneratorFunction";
        }
      }
      genFun.prototype = Object.create(Gp);
      return genFun;
    };

    // Within the body of any async function, `await x` is transformed to
    // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
    // `hasOwn.call(value, "__await")` to determine if the yielded value is
    // meant to be awaited.
    runtime.awrap = function(arg) {
      return { __await: arg };
    };

    function AsyncIterator(generator) {
      function invoke(method, arg, resolve, reject) {
        var record = tryCatch(generator[method], generator, arg);
        if (record.type === "throw") {
          reject(record.arg);
        } else {
          var result = record.arg;
          var value = result.value;
          if (value &&
              typeof value === "object" &&
              hasOwn.call(value, "__await")) {
            return Promise.resolve(value.__await).then(function(value) {
              invoke("next", value, resolve, reject);
            }, function(err) {
              invoke("throw", err, resolve, reject);
            });
          }

          return Promise.resolve(value).then(function(unwrapped) {
            // When a yielded Promise is resolved, its final value becomes
            // the .value of the Promise<{value,done}> result for the
            // current iteration.
            result.value = unwrapped;
            resolve(result);
          }, function(error) {
            // If a rejected Promise was yielded, throw the rejection back
            // into the async generator function so it can be handled there.
            return invoke("throw", error, resolve, reject);
          });
        }
      }

      var previousPromise;

      function enqueue(method, arg) {
        function callInvokeWithMethodAndArg() {
          return new Promise(function(resolve, reject) {
            invoke(method, arg, resolve, reject);
          });
        }

        return previousPromise =
          // If enqueue has been called before, then we want to wait until
          // all previous Promises have been resolved before calling invoke,
          // so that results are always delivered in the correct order. If
          // enqueue has not been called before, then it is important to
          // call invoke immediately, without waiting on a callback to fire,
          // so that the async generator function has the opportunity to do
          // any necessary setup in a predictable way. This predictability
          // is why the Promise constructor synchronously invokes its
          // executor callback, and why async functions synchronously
          // execute code before the first await. Since we implement simple
          // async functions in terms of async generators, it is especially
          // important to get this right, even though it requires care.
          previousPromise ? previousPromise.then(
            callInvokeWithMethodAndArg,
            // Avoid propagating failures to Promises returned by later
            // invocations of the iterator.
            callInvokeWithMethodAndArg
          ) : callInvokeWithMethodAndArg();
      }

      // Define the unified helper method that is used to implement .next,
      // .throw, and .return (see defineIteratorMethods).
      this._invoke = enqueue;
    }

    defineIteratorMethods(AsyncIterator.prototype);
    AsyncIterator.prototype[asyncIteratorSymbol] = function () {
      return this;
    };
    runtime.AsyncIterator = AsyncIterator;

    // Note that simple async functions are implemented on top of
    // AsyncIterator objects; they just return a Promise for the value of
    // the final result produced by the iterator.
    runtime.async = function(innerFn, outerFn, self, tryLocsList) {
      var iter = new AsyncIterator(
        wrap(innerFn, outerFn, self, tryLocsList)
      );

      return runtime.isGeneratorFunction(outerFn)
        ? iter // If outerFn is a generator, return the full iterator.
        : iter.next().then(function(result) {
            return result.done ? result.value : iter.next();
          });
    };

    function makeInvokeMethod(innerFn, self, context) {
      var state = GenStateSuspendedStart;

      return function invoke(method, arg) {
        if (state === GenStateExecuting) {
          throw new Error("Generator is already running");
        }

        if (state === GenStateCompleted) {
          if (method === "throw") {
            throw arg;
          }

          // Be forgiving, per 25.3.3.3.3 of the spec:
          // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
          return doneResult();
        }

        context.method = method;
        context.arg = arg;

        while (true) {
          var delegate = context.delegate;
          if (delegate) {
            var delegateResult = maybeInvokeDelegate(delegate, context);
            if (delegateResult) {
              if (delegateResult === ContinueSentinel) continue;
              return delegateResult;
            }
          }

          if (context.method === "next") {
            // Setting context._sent for legacy support of Babel's
            // function.sent implementation.
            context.sent = context._sent = context.arg;

          } else if (context.method === "throw") {
            if (state === GenStateSuspendedStart) {
              state = GenStateCompleted;
              throw context.arg;
            }

            context.dispatchException(context.arg);

          } else if (context.method === "return") {
            context.abrupt("return", context.arg);
          }

          state = GenStateExecuting;

          var record = tryCatch(innerFn, self, context);
          if (record.type === "normal") {
            // If an exception is thrown from innerFn, we leave state ===
            // GenStateExecuting and loop back for another invocation.
            state = context.done
              ? GenStateCompleted
              : GenStateSuspendedYield;

            if (record.arg === ContinueSentinel) {
              continue;
            }

            return {
              value: record.arg,
              done: context.done
            };

          } else if (record.type === "throw") {
            state = GenStateCompleted;
            // Dispatch the exception by looping back around to the
            // context.dispatchException(context.arg) call above.
            context.method = "throw";
            context.arg = record.arg;
          }
        }
      };
    }

    // Call delegate.iterator[context.method](context.arg) and handle the
    // result, either by returning a { value, done } result from the
    // delegate iterator, or by modifying context.method and context.arg,
    // setting context.delegate to null, and returning the ContinueSentinel.
    function maybeInvokeDelegate(delegate, context) {
      var method = delegate.iterator[context.method];
      if (method === undefined) {
        // A .throw or .return when the delegate iterator has no .throw
        // method always terminates the yield* loop.
        context.delegate = null;

        if (context.method === "throw") {
          if (delegate.iterator.return) {
            // If the delegate iterator has a return method, give it a
            // chance to clean up.
            context.method = "return";
            context.arg = undefined;
            maybeInvokeDelegate(delegate, context);

            if (context.method === "throw") {
              // If maybeInvokeDelegate(context) changed context.method from
              // "return" to "throw", let that override the TypeError below.
              return ContinueSentinel;
            }
          }

          context.method = "throw";
          context.arg = new TypeError(
            "The iterator does not provide a 'throw' method");
        }

        return ContinueSentinel;
      }

      var record = tryCatch(method, delegate.iterator, context.arg);

      if (record.type === "throw") {
        context.method = "throw";
        context.arg = record.arg;
        context.delegate = null;
        return ContinueSentinel;
      }

      var info = record.arg;

      if (! info) {
        context.method = "throw";
        context.arg = new TypeError("iterator result is not an object");
        context.delegate = null;
        return ContinueSentinel;
      }

      if (info.done) {
        // Assign the result of the finished delegate to the temporary
        // variable specified by delegate.resultName (see delegateYield).
        context[delegate.resultName] = info.value;

        // Resume execution at the desired location (see delegateYield).
        context.next = delegate.nextLoc;

        // If context.method was "throw" but the delegate handled the
        // exception, let the outer generator proceed normally. If
        // context.method was "next", forget context.arg since it has been
        // "consumed" by the delegate iterator. If context.method was
        // "return", allow the original .return call to continue in the
        // outer generator.
        if (context.method !== "return") {
          context.method = "next";
          context.arg = undefined;
        }

      } else {
        // Re-yield the result returned by the delegate method.
        return info;
      }

      // The delegate iterator is finished, so forget it and continue with
      // the outer generator.
      context.delegate = null;
      return ContinueSentinel;
    }

    // Define Generator.prototype.{next,throw,return} in terms of the
    // unified ._invoke helper method.
    defineIteratorMethods(Gp);

    Gp[toStringTagSymbol] = "Generator";

    // A Generator should always return itself as the iterator object when the
    // @@iterator function is called on it. Some browsers' implementations of the
    // iterator prototype chain incorrectly implement this, causing the Generator
    // object to not be returned from this call. This ensures that doesn't happen.
    // See https://github.com/facebook/regenerator/issues/274 for more details.
    Gp[iteratorSymbol] = function() {
      return this;
    };

    Gp.toString = function() {
      return "[object Generator]";
    };

    function pushTryEntry(locs) {
      var entry = { tryLoc: locs[0] };

      if (1 in locs) {
        entry.catchLoc = locs[1];
      }

      if (2 in locs) {
        entry.finallyLoc = locs[2];
        entry.afterLoc = locs[3];
      }

      this.tryEntries.push(entry);
    }

    function resetTryEntry(entry) {
      var record = entry.completion || {};
      record.type = "normal";
      delete record.arg;
      entry.completion = record;
    }

    function Context(tryLocsList) {
      // The root entry object (effectively a try statement without a catch
      // or a finally block) gives us a place to store values thrown from
      // locations where there is no enclosing try statement.
      this.tryEntries = [{ tryLoc: "root" }];
      tryLocsList.forEach(pushTryEntry, this);
      this.reset(true);
    }

    runtime.keys = function(object) {
      var keys = [];
      for (var key in object) {
        keys.push(key);
      }
      keys.reverse();

      // Rather than returning an object with a next method, we keep
      // things simple and return the next function itself.
      return function next() {
        while (keys.length) {
          var key = keys.pop();
          if (key in object) {
            next.value = key;
            next.done = false;
            return next;
          }
        }

        // To avoid creating an additional object, we just hang the .value
        // and .done properties off the next function object itself. This
        // also ensures that the minifier will not anonymize the function.
        next.done = true;
        return next;
      };
    };

    function values(iterable) {
      if (iterable) {
        var iteratorMethod = iterable[iteratorSymbol];
        if (iteratorMethod) {
          return iteratorMethod.call(iterable);
        }

        if (typeof iterable.next === "function") {
          return iterable;
        }

        if (!isNaN(iterable.length)) {
          var i = -1, next = function next() {
            while (++i < iterable.length) {
              if (hasOwn.call(iterable, i)) {
                next.value = iterable[i];
                next.done = false;
                return next;
              }
            }

            next.value = undefined;
            next.done = true;

            return next;
          };

          return next.next = next;
        }
      }

      // Return an iterator with no values.
      return { next: doneResult };
    }
    runtime.values = values;

    function doneResult() {
      return { value: undefined, done: true };
    }

    Context.prototype = {
      constructor: Context,

      reset: function(skipTempReset) {
        this.prev = 0;
        this.next = 0;
        // Resetting context._sent for legacy support of Babel's
        // function.sent implementation.
        this.sent = this._sent = undefined;
        this.done = false;
        this.delegate = null;

        this.method = "next";
        this.arg = undefined;

        this.tryEntries.forEach(resetTryEntry);

        if (!skipTempReset) {
          for (var name in this) {
            // Not sure about the optimal order of these conditions:
            if (name.charAt(0) === "t" &&
                hasOwn.call(this, name) &&
                !isNaN(+name.slice(1))) {
              this[name] = undefined;
            }
          }
        }
      },

      stop: function() {
        this.done = true;

        var rootEntry = this.tryEntries[0];
        var rootRecord = rootEntry.completion;
        if (rootRecord.type === "throw") {
          throw rootRecord.arg;
        }

        return this.rval;
      },

      dispatchException: function(exception) {
        if (this.done) {
          throw exception;
        }

        var context = this;
        function handle(loc, caught) {
          record.type = "throw";
          record.arg = exception;
          context.next = loc;

          if (caught) {
            // If the dispatched exception was caught by a catch block,
            // then let that catch block handle the exception normally.
            context.method = "next";
            context.arg = undefined;
          }

          return !! caught;
        }

        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          var record = entry.completion;

          if (entry.tryLoc === "root") {
            // Exception thrown outside of any try block that could handle
            // it, so set the completion value of the entire function to
            // throw the exception.
            return handle("end");
          }

          if (entry.tryLoc <= this.prev) {
            var hasCatch = hasOwn.call(entry, "catchLoc");
            var hasFinally = hasOwn.call(entry, "finallyLoc");

            if (hasCatch && hasFinally) {
              if (this.prev < entry.catchLoc) {
                return handle(entry.catchLoc, true);
              } else if (this.prev < entry.finallyLoc) {
                return handle(entry.finallyLoc);
              }

            } else if (hasCatch) {
              if (this.prev < entry.catchLoc) {
                return handle(entry.catchLoc, true);
              }

            } else if (hasFinally) {
              if (this.prev < entry.finallyLoc) {
                return handle(entry.finallyLoc);
              }

            } else {
              throw new Error("try statement without catch or finally");
            }
          }
        }
      },

      abrupt: function(type, arg) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.tryLoc <= this.prev &&
              hasOwn.call(entry, "finallyLoc") &&
              this.prev < entry.finallyLoc) {
            var finallyEntry = entry;
            break;
          }
        }

        if (finallyEntry &&
            (type === "break" ||
             type === "continue") &&
            finallyEntry.tryLoc <= arg &&
            arg <= finallyEntry.finallyLoc) {
          // Ignore the finally entry if control is not jumping to a
          // location outside the try/catch block.
          finallyEntry = null;
        }

        var record = finallyEntry ? finallyEntry.completion : {};
        record.type = type;
        record.arg = arg;

        if (finallyEntry) {
          this.method = "next";
          this.next = finallyEntry.finallyLoc;
          return ContinueSentinel;
        }

        return this.complete(record);
      },

      complete: function(record, afterLoc) {
        if (record.type === "throw") {
          throw record.arg;
        }

        if (record.type === "break" ||
            record.type === "continue") {
          this.next = record.arg;
        } else if (record.type === "return") {
          this.rval = this.arg = record.arg;
          this.method = "return";
          this.next = "end";
        } else if (record.type === "normal" && afterLoc) {
          this.next = afterLoc;
        }

        return ContinueSentinel;
      },

      finish: function(finallyLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.finallyLoc === finallyLoc) {
            this.complete(entry.completion, entry.afterLoc);
            resetTryEntry(entry);
            return ContinueSentinel;
          }
        }
      },

      "catch": function(tryLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.tryLoc === tryLoc) {
            var record = entry.completion;
            if (record.type === "throw") {
              var thrown = record.arg;
              resetTryEntry(entry);
            }
            return thrown;
          }
        }

        // The context.catch method must only be called with a location
        // argument that corresponds to a known catch block.
        throw new Error("illegal catch attempt");
      },

      delegateYield: function(iterable, resultName, nextLoc) {
        this.delegate = {
          iterator: values(iterable),
          resultName: resultName,
          nextLoc: nextLoc
        };

        if (this.method === "next") {
          // Deliberately forget the last sent value so that we don't
          // accidentally pass it on to the delegate.
          this.arg = undefined;
        }

        return ContinueSentinel;
      }
    };
  })(
    // In sloppy mode, unbound `this` refers to the global object, fallback to
    // Function constructor if we're in global strict mode. That is sadly a form
    // of indirect eval which violates Content Security Policy.
    (function() {
      return this || (typeof self === "object" && self);
    })() || Function("return this")()
  );
  });

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

  var dP$4 = _objectDp$1.f;
  var FProto = Function.prototype;
  var nameRE = /^\s*function ([^ (]*)/;
  var NAME$1 = 'name';

  // 19.2.4.2 name
  NAME$1 in FProto || _descriptors$1 && dP$4(FProto, NAME$1, {
    configurable: true,
    get: function () {
      try {
        return ('' + this).match(nameRE)[1];
      } catch (e) {
        return '';
      }
    }
  });

  // https://github.com/tc39/Array.prototype.includes

  var $includes = _arrayIncludes$1(true);

  _export$1(_export$1.P, 'Array', {
    includes: function includes(el /* , fromIndex = 0 */) {
      return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
    }
  });

  _addToUnscopables$1('includes');

  // helper for String#{startsWith, endsWith, includes}



  var _stringContext = function (that, searchString, NAME) {
    if (_isRegexp(searchString)) throw TypeError('String#' + NAME + " doesn't accept regex!");
    return String(_defined$1(that));
  };

  var MATCH$1 = _wks$1('match');
  var _failsIsRegexp = function (KEY) {
    var re = /./;
    try {
      '/./'[KEY](re);
    } catch (e) {
      try {
        re[MATCH$1] = false;
        return !'/./'[KEY](re);
      } catch (f) { /* empty */ }
    } return true;
  };

  var INCLUDES = 'includes';

  _export$1(_export$1.P + _export$1.F * _failsIsRegexp(INCLUDES), 'String', {
    includes: function includes(searchString /* , position = 0 */) {
      return !!~_stringContext(this, searchString, INCLUDES)
        .indexOf(searchString, arguments.length > 1 ? arguments[1] : undefined);
    }
  });

  // most Object methods by ES6 should accept primitives



  var _objectSap = function (KEY, exec) {
    var fn = (_core.Object || {})[KEY] || Object[KEY];
    var exp = {};
    exp[KEY] = exec(fn);
    _export(_export.S + _export.F * _fails(function () { fn(1); }), 'Object', exp);
  };

  // 19.1.2.14 Object.keys(O)



  _objectSap('keys', function () {
    return function keys(it) {
      return _objectKeys(_toObject(it));
    };
  });

  var keys$1 = _core.Object.keys;

  var keys$2 = keys$1;

  var isEnum$1 = _objectPie.f;
  var _objectToArray = function (isEntries) {
    return function (it) {
      var O = _toIobject(it);
      var keys = _objectKeys(O);
      var length = keys.length;
      var i = 0;
      var result = [];
      var key;
      while (length > i) if (isEnum$1.call(O, key = keys[i++])) {
        result.push(isEntries ? [key, O[key]] : O[key]);
      } return result;
    };
  };

  // https://github.com/tc39/proposal-object-values-entries

  var $values = _objectToArray(false);

  _export(_export.S, 'Object', {
    values: function values(it) {
      return $values(it);
    }
  });

  var values = _core.Object.values;

  var values$1 = values;

  var _iterStep$1 = function (done, value) {
    return { value: value, done: !!done };
  };

  var _iterators$1 = {};

  // 19.1.2.14 / 15.2.3.14 Object.keys(O)



  var _objectKeys$1 = Object.keys || function keys(O) {
    return _objectKeysInternal$1(O, _enumBugKeys$1);
  };

  var _objectDps$1 = _descriptors$1 ? Object.defineProperties : function defineProperties(O, Properties) {
    _anObject$1(O);
    var keys = _objectKeys$1(Properties);
    var length = keys.length;
    var i = 0;
    var P;
    while (length > i) _objectDp$1.f(O, P = keys[i++], Properties[P]);
    return O;
  };

  var document$4 = _global$1.document;
  var _html$1 = document$4 && document$4.documentElement;

  // 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])



  var IE_PROTO$4 = _sharedKey$1('IE_PROTO');
  var Empty$1 = function () { /* empty */ };
  var PROTOTYPE$4 = 'prototype';

  // Create object with fake `null` prototype: use iframe Object with cleared prototype
  var createDict$1 = function () {
    // Thrash, waste and sodomy: IE GC bug
    var iframe = _domCreate$1('iframe');
    var i = _enumBugKeys$1.length;
    var lt = '<';
    var gt = '>';
    var iframeDocument;
    iframe.style.display = 'none';
    _html$1.appendChild(iframe);
    iframe.src = 'javascript:'; // eslint-disable-line no-script-url
    // createDict = iframe.contentWindow.Object;
    // html.removeChild(iframe);
    iframeDocument = iframe.contentWindow.document;
    iframeDocument.open();
    iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
    iframeDocument.close();
    createDict$1 = iframeDocument.F;
    while (i--) delete createDict$1[PROTOTYPE$4][_enumBugKeys$1[i]];
    return createDict$1();
  };

  var _objectCreate$1 = Object.create || function create(O, Properties) {
    var result;
    if (O !== null) {
      Empty$1[PROTOTYPE$4] = _anObject$1(O);
      result = new Empty$1();
      Empty$1[PROTOTYPE$4] = null;
      // add "__proto__" for Object.getPrototypeOf polyfill
      result[IE_PROTO$4] = O;
    } else result = createDict$1();
    return Properties === undefined ? result : _objectDps$1(result, Properties);
  };

  var def$1 = _objectDp$1.f;

  var TAG$2 = _wks$1('toStringTag');

  var _setToStringTag$1 = function (it, tag, stat) {
    if (it && !_has$1(it = stat ? it : it.prototype, TAG$2)) def$1(it, TAG$2, { configurable: true, value: tag });
  };

  var IteratorPrototype$1 = {};

  // 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
  _hide$1(IteratorPrototype$1, _wks$1('iterator'), function () { return this; });

  var _iterCreate$1 = function (Constructor, NAME, next) {
    Constructor.prototype = _objectCreate$1(IteratorPrototype$1, { next: _propertyDesc$1(1, next) });
    _setToStringTag$1(Constructor, NAME + ' Iterator');
  };

  // 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)


  var IE_PROTO$5 = _sharedKey$1('IE_PROTO');
  var ObjectProto$2 = Object.prototype;

  var _objectGpo$1 = Object.getPrototypeOf || function (O) {
    O = _toObject$1(O);
    if (_has$1(O, IE_PROTO$5)) return O[IE_PROTO$5];
    if (typeof O.constructor == 'function' && O instanceof O.constructor) {
      return O.constructor.prototype;
    } return O instanceof Object ? ObjectProto$2 : null;
  };

  var ITERATOR$5 = _wks$1('iterator');
  var BUGGY$1 = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
  var FF_ITERATOR$1 = '@@iterator';
  var KEYS$1 = 'keys';
  var VALUES$1 = 'values';

  var returnThis$1 = function () { return this; };

  var _iterDefine$1 = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
    _iterCreate$1(Constructor, NAME, next);
    var getMethod = function (kind) {
      if (!BUGGY$1 && kind in proto) return proto[kind];
      switch (kind) {
        case KEYS$1: return function keys() { return new Constructor(this, kind); };
        case VALUES$1: return function values() { return new Constructor(this, kind); };
      } return function entries() { return new Constructor(this, kind); };
    };
    var TAG = NAME + ' Iterator';
    var DEF_VALUES = DEFAULT == VALUES$1;
    var VALUES_BUG = false;
    var proto = Base.prototype;
    var $native = proto[ITERATOR$5] || proto[FF_ITERATOR$1] || DEFAULT && proto[DEFAULT];
    var $default = $native || getMethod(DEFAULT);
    var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
    var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
    var methods, key, IteratorPrototype;
    // Fix native
    if ($anyNative) {
      IteratorPrototype = _objectGpo$1($anyNative.call(new Base()));
      if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
        // Set @@toStringTag to native iterators
        _setToStringTag$1(IteratorPrototype, TAG, true);
        // fix for some old engines
        if (!_library$1 && typeof IteratorPrototype[ITERATOR$5] != 'function') _hide$1(IteratorPrototype, ITERATOR$5, returnThis$1);
      }
    }
    // fix Array#{values, @@iterator}.name in V8 / FF
    if (DEF_VALUES && $native && $native.name !== VALUES$1) {
      VALUES_BUG = true;
      $default = function values() { return $native.call(this); };
    }
    // Define iterator
    if ((!_library$1 || FORCED) && (BUGGY$1 || VALUES_BUG || !proto[ITERATOR$5])) {
      _hide$1(proto, ITERATOR$5, $default);
    }
    // Plug for library
    _iterators$1[NAME] = $default;
    _iterators$1[TAG] = returnThis$1;
    if (DEFAULT) {
      methods = {
        values: DEF_VALUES ? $default : getMethod(VALUES$1),
        keys: IS_SET ? $default : getMethod(KEYS$1),
        entries: $entries
      };
      if (FORCED) for (key in methods) {
        if (!(key in proto)) _redefine$1(proto, key, methods[key]);
      } else _export$1(_export$1.P + _export$1.F * (BUGGY$1 || VALUES_BUG), NAME, methods);
    }
    return methods;
  };

  // 22.1.3.4 Array.prototype.entries()
  // 22.1.3.13 Array.prototype.keys()
  // 22.1.3.29 Array.prototype.values()
  // 22.1.3.30 Array.prototype[@@iterator]()
  var es6_array_iterator$1 = _iterDefine$1(Array, 'Array', function (iterated, kind) {
    this._t = _toIobject$1(iterated); // target
    this._i = 0;                   // next index
    this._k = kind;                // kind
  // 22.1.5.2.1 %ArrayIteratorPrototype%.next()
  }, function () {
    var O = this._t;
    var kind = this._k;
    var index = this._i++;
    if (!O || index >= O.length) {
      this._t = undefined;
      return _iterStep$1(1);
    }
    if (kind == 'keys') return _iterStep$1(0, index);
    if (kind == 'values') return _iterStep$1(0, O[index]);
    return _iterStep$1(0, [index, O[index]]);
  }, 'values');

  // argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
  _iterators$1.Arguments = _iterators$1.Array;

  _addToUnscopables$1('keys');
  _addToUnscopables$1('values');
  _addToUnscopables$1('entries');

  var ITERATOR$6 = _wks$1('iterator');
  var TO_STRING_TAG$1 = _wks$1('toStringTag');
  var ArrayValues = _iterators$1.Array;

  var DOMIterables$1 = {
    CSSRuleList: true, // TODO: Not spec compliant, should be false.
    CSSStyleDeclaration: false,
    CSSValueList: false,
    ClientRectList: false,
    DOMRectList: false,
    DOMStringList: false,
    DOMTokenList: true,
    DataTransferItemList: false,
    FileList: false,
    HTMLAllCollection: false,
    HTMLCollection: false,
    HTMLFormElement: false,
    HTMLSelectElement: false,
    MediaList: true, // TODO: Not spec compliant, should be false.
    MimeTypeArray: false,
    NamedNodeMap: false,
    NodeList: true,
    PaintRequestList: false,
    Plugin: false,
    PluginArray: false,
    SVGLengthList: false,
    SVGNumberList: false,
    SVGPathSegList: false,
    SVGPointList: false,
    SVGStringList: false,
    SVGTransformList: false,
    SourceBufferList: false,
    StyleSheetList: true, // TODO: Not spec compliant, should be false.
    TextTrackCueList: false,
    TextTrackList: false,
    TouchList: false
  };

  for (var collections = _objectKeys$1(DOMIterables$1), i$2 = 0; i$2 < collections.length; i$2++) {
    var NAME$2 = collections[i$2];
    var explicit = DOMIterables$1[NAME$2];
    var Collection$1 = _global$1[NAME$2];
    var proto$2 = Collection$1 && Collection$1.prototype;
    var key;
    if (proto$2) {
      if (!proto$2[ITERATOR$6]) _hide$1(proto$2, ITERATOR$6, ArrayValues);
      if (!proto$2[TO_STRING_TAG$1]) _hide$1(proto$2, TO_STRING_TAG$1, NAME$2);
      _iterators$1[NAME$2] = ArrayValues;
      if (explicit) for (key in es6_array_iterator$1) if (!proto$2[key]) _redefine$1(proto$2, key, es6_array_iterator$1[key], true);
    }
  }

  // 19.1.2.7 Object.getOwnPropertyNames(O)
  _objectSap('getOwnPropertyNames', function () {
    return _objectGopnExt.f;
  });

  var $Object = _core.Object;
  var getOwnPropertyNames = function getOwnPropertyNames(it) {
    return $Object.getOwnPropertyNames(it);
  };

  var getOwnPropertyNames$1 = getOwnPropertyNames;

  var core_getIterator = _core.getIterator = function (it) {
    var iterFn = core_getIteratorMethod(it);
    if (typeof iterFn != 'function') throw TypeError(it + ' is not iterable!');
    return _anObject(iterFn.call(it));
  };

  var getIterator = core_getIterator;

  var getIterator$1 = getIterator;

  // 19.1.2.1 Object.assign(target, source, ...)





  var $assign = Object.assign;

  // should work with symbols and should have deterministic property order (V8 bug)
  var _objectAssign = !$assign || _fails(function () {
    var A = {};
    var B = {};
    // eslint-disable-next-line no-undef
    var S = Symbol();
    var K = 'abcdefghijklmnopqrst';
    A[S] = 7;
    K.split('').forEach(function (k) { B[k] = k; });
    return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
  }) ? function assign(target, source) { // eslint-disable-line no-unused-vars
    var T = _toObject(target);
    var aLen = arguments.length;
    var index = 1;
    var getSymbols = _objectGops.f;
    var isEnum = _objectPie.f;
    while (aLen > index) {
      var S = _iobject(arguments[index++]);
      var keys = getSymbols ? _objectKeys(S).concat(getSymbols(S)) : _objectKeys(S);
      var length = keys.length;
      var j = 0;
      var key;
      while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
    } return T;
  } : $assign;

  // 19.1.3.1 Object.assign(target, source)


  _export(_export.S + _export.F, 'Object', { assign: _objectAssign });

  var assign = _core.Object.assign;

  var assign$1 = assign;

  // true  -> String#at
  // false -> String#codePointAt
  var _stringAt$1 = function (TO_STRING) {
    return function (that, pos) {
      var s = String(_defined$1(that));
      var i = _toInteger$1(pos);
      var l = s.length;
      var a, b;
      if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
      a = s.charCodeAt(i);
      return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
        ? TO_STRING ? s.charAt(i) : a
        : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
    };
  };

  var at = _stringAt$1(true);

   // `AdvanceStringIndex` abstract operation
  // https://tc39.github.io/ecma262/#sec-advancestringindex
  var _advanceStringIndex = function (S, index, unicode) {
    return index + (unicode ? at(S, index).length : 1);
  };

  // getting tag from 19.1.3.6 Object.prototype.toString()

  var TAG$3 = _wks$1('toStringTag');
  // ES3 wrong here
  var ARG$1 = _cof$1(function () { return arguments; }()) == 'Arguments';

  // fallback for IE11 Script Access Denied error
  var tryGet$1 = function (it, key) {
    try {
      return it[key];
    } catch (e) { /* empty */ }
  };

  var _classof$1 = function (it) {
    var O, T, B;
    return it === undefined ? 'Undefined' : it === null ? 'Null'
      // @@toStringTag case
      : typeof (T = tryGet$1(O = Object(it), TAG$3)) == 'string' ? T
      // builtinTag case
      : ARG$1 ? _cof$1(O)
      // ES3 arguments fallback
      : (B = _cof$1(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
  };

  var builtinExec = RegExp.prototype.exec;

   // `RegExpExec` abstract operation
  // https://tc39.github.io/ecma262/#sec-regexpexec
  var _regexpExecAbstract = function (R, S) {
    var exec = R.exec;
    if (typeof exec === 'function') {
      var result = exec.call(R, S);
      if (typeof result !== 'object') {
        throw new TypeError('RegExp exec method returned something other than an Object or null');
      }
      return result;
    }
    if (_classof$1(R) !== 'RegExp') {
      throw new TypeError('RegExp#exec called on incompatible receiver');
    }
    return builtinExec.call(R, S);
  };

  var nativeExec = RegExp.prototype.exec;
  // This always refers to the native implementation, because the
  // String#replace polyfill uses ./fix-regexp-well-known-symbol-logic.js,
  // which loads this file before patching the method.
  var nativeReplace = String.prototype.replace;

  var patchedExec = nativeExec;

  var LAST_INDEX = 'lastIndex';

  var UPDATES_LAST_INDEX_WRONG = (function () {
    var re1 = /a/,
        re2 = /b*/g;
    nativeExec.call(re1, 'a');
    nativeExec.call(re2, 'a');
    return re1[LAST_INDEX] !== 0 || re2[LAST_INDEX] !== 0;
  })();

  // nonparticipating capturing group, copied from es5-shim's String#split patch.
  var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

  var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED;

  if (PATCH) {
    patchedExec = function exec(str) {
      var re = this;
      var lastIndex, reCopy, match, i;

      if (NPCG_INCLUDED) {
        reCopy = new RegExp('^' + re.source + '$(?!\\s)', _flags.call(re));
      }
      if (UPDATES_LAST_INDEX_WRONG) lastIndex = re[LAST_INDEX];

      match = nativeExec.call(re, str);

      if (UPDATES_LAST_INDEX_WRONG && match) {
        re[LAST_INDEX] = re.global ? match.index + match[0].length : lastIndex;
      }
      if (NPCG_INCLUDED && match && match.length > 1) {
        // Fix browsers whose `exec` methods don't consistently return `undefined`
        // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
        // eslint-disable-next-line no-loop-func
        nativeReplace.call(match[0], reCopy, function () {
          for (i = 1; i < arguments.length - 2; i++) {
            if (arguments[i] === undefined) match[i] = undefined;
          }
        });
      }

      return match;
    };
  }

  var _regexpExec = patchedExec;

  _export$1({
    target: 'RegExp',
    proto: true,
    forced: _regexpExec !== /./.exec
  }, {
    exec: _regexpExec
  });

  var SPECIES$4 = _wks$1('species');

  var REPLACE_SUPPORTS_NAMED_GROUPS = !_fails$1(function () {
    // #replace needs built-in support for named groups.
    // #match works fine because it just return the exec results, even if it has
    // a "grops" property.
    var re = /./;
    re.exec = function () {
      var result = [];
      result.groups = { a: '7' };
      return result;
    };
    return ''.replace(re, '$<a>') !== '7';
  });

  var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = (function () {
    // Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
    var re = /(?:)/;
    var originalExec = re.exec;
    re.exec = function () { return originalExec.apply(this, arguments); };
    var result = 'ab'.split(re);
    return result.length === 2 && result[0] === 'a' && result[1] === 'b';
  })();

  var _fixReWks = function (KEY, length, exec) {
    var SYMBOL = _wks$1(KEY);

    var DELEGATES_TO_SYMBOL = !_fails$1(function () {
      // String methods call symbol-named RegEp methods
      var O = {};
      O[SYMBOL] = function () { return 7; };
      return ''[KEY](O) != 7;
    });

    var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL ? !_fails$1(function () {
      // Symbol-named RegExp methods call .exec
      var execCalled = false;
      var re = /a/;
      re.exec = function () { execCalled = true; return null; };
      if (KEY === 'split') {
        // RegExp[@@split] doesn't call the regex's exec method, but first creates
        // a new one. We need to return the patched regex when creating the new one.
        re.constructor = {};
        re.constructor[SPECIES$4] = function () { return re; };
      }
      re[SYMBOL]('');
      return !execCalled;
    }) : undefined;

    if (
      !DELEGATES_TO_SYMBOL ||
      !DELEGATES_TO_EXEC ||
      (KEY === 'replace' && !REPLACE_SUPPORTS_NAMED_GROUPS) ||
      (KEY === 'split' && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC)
    ) {
      var nativeRegExpMethod = /./[SYMBOL];
      var fns = exec(
        _defined$1,
        SYMBOL,
        ''[KEY],
        function maybeCallNative(nativeMethod, regexp, str, arg2, forceStringMethod) {
          if (regexp.exec === _regexpExec) {
            if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
              // The native String method already delegates to @@method (this
              // polyfilled function), leasing to infinite recursion.
              // We avoid it by directly calling the native @@method method.
              return { done: true, value: nativeRegExpMethod.call(regexp, str, arg2) };
            }
            return { done: true, value: nativeMethod.call(str, regexp, arg2) };
          }
          return { done: false };
        }
      );
      var strfn = fns[0];
      var rxfn = fns[1];

      _redefine$1(String.prototype, KEY, strfn);
      _hide$1(RegExp.prototype, SYMBOL, length == 2
        // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
        // 21.2.5.11 RegExp.prototype[@@split](string, limit)
        ? function (string, arg) { return rxfn.call(string, this, arg); }
        // 21.2.5.6 RegExp.prototype[@@match](string)
        // 21.2.5.9 RegExp.prototype[@@search](string)
        : function (string) { return rxfn.call(string, this); }
      );
    }
  };

  var max$2 = Math.max;
  var min$4 = Math.min;
  var floor$2 = Math.floor;
  var SUBSTITUTION_SYMBOLS = /\$([$&`']|\d\d?|<[^>]*>)/g;
  var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&`']|\d\d?)/g;

  var maybeToString = function (it) {
    return it === undefined ? it : String(it);
  };

  // @@replace logic
  _fixReWks('replace', 2, function (defined, REPLACE, $replace, maybeCallNative) {
    return [
      // `String.prototype.replace` method
      // https://tc39.github.io/ecma262/#sec-string.prototype.replace
      function replace(searchValue, replaceValue) {
        var O = defined(this);
        var fn = searchValue == undefined ? undefined : searchValue[REPLACE];
        return fn !== undefined
          ? fn.call(searchValue, O, replaceValue)
          : $replace.call(String(O), searchValue, replaceValue);
      },
      // `RegExp.prototype[@@replace]` method
      // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@replace
      function (regexp, replaceValue) {
        var res = maybeCallNative($replace, regexp, this, replaceValue);
        if (res.done) return res.value;

        var rx = _anObject$1(regexp);
        var S = String(this);
        var functionalReplace = typeof replaceValue === 'function';
        if (!functionalReplace) replaceValue = String(replaceValue);
        var global = rx.global;
        if (global) {
          var fullUnicode = rx.unicode;
          rx.lastIndex = 0;
        }
        var results = [];
        while (true) {
          var result = _regexpExecAbstract(rx, S);
          if (result === null) break;
          results.push(result);
          if (!global) break;
          var matchStr = String(result[0]);
          if (matchStr === '') rx.lastIndex = _advanceStringIndex(S, _toLength$1(rx.lastIndex), fullUnicode);
        }
        var accumulatedResult = '';
        var nextSourcePosition = 0;
        for (var i = 0; i < results.length; i++) {
          result = results[i];
          var matched = String(result[0]);
          var position = max$2(min$4(_toInteger$1(result.index), S.length), 0);
          var captures = [];
          // NOTE: This is equivalent to
          //   captures = result.slice(1).map(maybeToString)
          // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
          // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
          // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
          for (var j = 1; j < result.length; j++) captures.push(maybeToString(result[j]));
          var namedCaptures = result.groups;
          if (functionalReplace) {
            var replacerArgs = [matched].concat(captures, position, S);
            if (namedCaptures !== undefined) replacerArgs.push(namedCaptures);
            var replacement = String(replaceValue.apply(undefined, replacerArgs));
          } else {
            replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
          }
          if (position >= nextSourcePosition) {
            accumulatedResult += S.slice(nextSourcePosition, position) + replacement;
            nextSourcePosition = position + matched.length;
          }
        }
        return accumulatedResult + S.slice(nextSourcePosition);
      }
    ];

      // https://tc39.github.io/ecma262/#sec-getsubstitution
    function getSubstitution(matched, str, position, captures, namedCaptures, replacement) {
      var tailPos = position + matched.length;
      var m = captures.length;
      var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
      if (namedCaptures !== undefined) {
        namedCaptures = _toObject$1(namedCaptures);
        symbols = SUBSTITUTION_SYMBOLS;
      }
      return $replace.call(replacement, symbols, function (match, ch) {
        var capture;
        switch (ch.charAt(0)) {
          case '$': return '$';
          case '&': return matched;
          case '`': return str.slice(0, position);
          case "'": return str.slice(tailPos);
          case '<':
            capture = namedCaptures[ch.slice(1, -1)];
            break;
          default: // \d\d?
            var n = +ch;
            if (n === 0) return ch;
            if (n > m) {
              var f = floor$2(n / 10);
              if (f === 0) return ch;
              if (f <= m) return captures[f - 1] === undefined ? ch.charAt(1) : captures[f - 1] + ch.charAt(1);
              return ch;
            }
            capture = captures[n - 1];
        }
        return capture === undefined ? '' : capture;
      });
    }
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  // 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
  _export(_export.S + _export.F * !_descriptors, 'Object', { defineProperty: _objectDp.f });

  var $Object$1 = _core.Object;
  var defineProperty$1 = function defineProperty(it, key, desc) {
    return $Object$1.defineProperty(it, key, desc);
  };

  var defineProperty$2 = defineProperty$1;

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;

      defineProperty$2(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      defineProperty$2(obj, key, {
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

  var _anInstance$1 = function (it, Constructor, name, forbiddenField) {
    if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
      throw TypeError(name + ': incorrect invocation!');
    } return it;
  };

  // call something on iterator step with safe closing on error

  var _iterCall$1 = function (iterator, fn, value, entries) {
    try {
      return entries ? fn(_anObject$1(value)[0], value[1]) : fn(value);
    // 7.4.6 IteratorClose(iterator, completion)
    } catch (e) {
      var ret = iterator['return'];
      if (ret !== undefined) _anObject$1(ret.call(iterator));
      throw e;
    }
  };

  // check on default Array iterator

  var ITERATOR$7 = _wks$1('iterator');
  var ArrayProto$2 = Array.prototype;

  var _isArrayIter$1 = function (it) {
    return it !== undefined && (_iterators$1.Array === it || ArrayProto$2[ITERATOR$7] === it);
  };

  var ITERATOR$8 = _wks$1('iterator');

  var core_getIteratorMethod$1 = _core$1.getIteratorMethod = function (it) {
    if (it != undefined) return it[ITERATOR$8]
      || it['@@iterator']
      || _iterators$1[_classof$1(it)];
  };

  var _forOf$1 = createCommonjsModule(function (module) {
  var BREAK = {};
  var RETURN = {};
  var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
    var iterFn = ITERATOR ? function () { return iterable; } : core_getIteratorMethod$1(iterable);
    var f = _ctx$1(fn, that, entries ? 2 : 1);
    var index = 0;
    var length, step, iterator, result;
    if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
    // fast case for arrays with default iterator
    if (_isArrayIter$1(iterFn)) for (length = _toLength$1(iterable.length); length > index; index++) {
      result = entries ? f(_anObject$1(step = iterable[index])[0], step[1]) : f(iterable[index]);
      if (result === BREAK || result === RETURN) return result;
    } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
      result = _iterCall$1(iterator, f, step.value, entries);
      if (result === BREAK || result === RETURN) return result;
    }
  };
  exports.BREAK = BREAK;
  exports.RETURN = RETURN;
  });

  // 7.3.20 SpeciesConstructor(O, defaultConstructor)


  var SPECIES$5 = _wks$1('species');
  var _speciesConstructor$1 = function (O, D) {
    var C = _anObject$1(O).constructor;
    var S;
    return C === undefined || (S = _anObject$1(C)[SPECIES$5]) == undefined ? D : _aFunction$1(S);
  };

  // fast apply, http://jsperf.lnkit.com/fast-apply/5
  var _invoke$1 = function (fn, args, that) {
    var un = that === undefined;
    switch (args.length) {
      case 0: return un ? fn()
                        : fn.call(that);
      case 1: return un ? fn(args[0])
                        : fn.call(that, args[0]);
      case 2: return un ? fn(args[0], args[1])
                        : fn.call(that, args[0], args[1]);
      case 3: return un ? fn(args[0], args[1], args[2])
                        : fn.call(that, args[0], args[1], args[2]);
      case 4: return un ? fn(args[0], args[1], args[2], args[3])
                        : fn.call(that, args[0], args[1], args[2], args[3]);
    } return fn.apply(that, args);
  };

  var process$3 = _global$1.process;
  var setTask$1 = _global$1.setImmediate;
  var clearTask$1 = _global$1.clearImmediate;
  var MessageChannel$1 = _global$1.MessageChannel;
  var Dispatch$1 = _global$1.Dispatch;
  var counter$1 = 0;
  var queue$1 = {};
  var ONREADYSTATECHANGE$1 = 'onreadystatechange';
  var defer$1, channel$1, port$1;
  var run$1 = function () {
    var id = +this;
    // eslint-disable-next-line no-prototype-builtins
    if (queue$1.hasOwnProperty(id)) {
      var fn = queue$1[id];
      delete queue$1[id];
      fn();
    }
  };
  var listener$1 = function (event) {
    run$1.call(event.data);
  };
  // Node.js 0.9+ & IE10+ has setImmediate, otherwise:
  if (!setTask$1 || !clearTask$1) {
    setTask$1 = function setImmediate(fn) {
      var args = [];
      var i = 1;
      while (arguments.length > i) args.push(arguments[i++]);
      queue$1[++counter$1] = function () {
        // eslint-disable-next-line no-new-func
        _invoke$1(typeof fn == 'function' ? fn : Function(fn), args);
      };
      defer$1(counter$1);
      return counter$1;
    };
    clearTask$1 = function clearImmediate(id) {
      delete queue$1[id];
    };
    // Node.js 0.8-
    if (_cof$1(process$3) == 'process') {
      defer$1 = function (id) {
        process$3.nextTick(_ctx$1(run$1, id, 1));
      };
    // Sphere (JS game engine) Dispatch API
    } else if (Dispatch$1 && Dispatch$1.now) {
      defer$1 = function (id) {
        Dispatch$1.now(_ctx$1(run$1, id, 1));
      };
    // Browsers with MessageChannel, includes WebWorkers
    } else if (MessageChannel$1) {
      channel$1 = new MessageChannel$1();
      port$1 = channel$1.port2;
      channel$1.port1.onmessage = listener$1;
      defer$1 = _ctx$1(port$1.postMessage, port$1, 1);
    // Browsers with postMessage, skip WebWorkers
    // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
    } else if (_global$1.addEventListener && typeof postMessage == 'function' && !_global$1.importScripts) {
      defer$1 = function (id) {
        _global$1.postMessage(id + '', '*');
      };
      _global$1.addEventListener('message', listener$1, false);
    // IE8-
    } else if (ONREADYSTATECHANGE$1 in _domCreate$1('script')) {
      defer$1 = function (id) {
        _html$1.appendChild(_domCreate$1('script'))[ONREADYSTATECHANGE$1] = function () {
          _html$1.removeChild(this);
          run$1.call(id);
        };
      };
    // Rest old browsers
    } else {
      defer$1 = function (id) {
        setTimeout(_ctx$1(run$1, id, 1), 0);
      };
    }
  }
  var _task$1 = {
    set: setTask$1,
    clear: clearTask$1
  };

  var macrotask$1 = _task$1.set;
  var Observer$1 = _global$1.MutationObserver || _global$1.WebKitMutationObserver;
  var process$4 = _global$1.process;
  var Promise$2 = _global$1.Promise;
  var isNode$2 = _cof$1(process$4) == 'process';

  var _microtask$1 = function () {
    var head, last, notify;

    var flush = function () {
      var parent, fn;
      if (isNode$2 && (parent = process$4.domain)) parent.exit();
      while (head) {
        fn = head.fn;
        head = head.next;
        try {
          fn();
        } catch (e) {
          if (head) notify();
          else last = undefined;
          throw e;
        }
      } last = undefined;
      if (parent) parent.enter();
    };

    // Node.js
    if (isNode$2) {
      notify = function () {
        process$4.nextTick(flush);
      };
    // browsers with MutationObserver, except iOS Safari - https://github.com/zloirock/core-js/issues/339
    } else if (Observer$1 && !(_global$1.navigator && _global$1.navigator.standalone)) {
      var toggle = true;
      var node = document.createTextNode('');
      new Observer$1(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
      notify = function () {
        node.data = toggle = !toggle;
      };
    // environments with maybe non-completely correct, but existent Promise
    } else if (Promise$2 && Promise$2.resolve) {
      // Promise.resolve without an argument throws an error in LG WebOS 2
      var promise = Promise$2.resolve(undefined);
      notify = function () {
        promise.then(flush);
      };
    // for other environments - macrotask based on:
    // - setImmediate
    // - MessageChannel
    // - window.postMessag
    // - onreadystatechange
    // - setTimeout
    } else {
      notify = function () {
        // strange IE + webpack dev server bug - use .call(global)
        macrotask$1.call(_global$1, flush);
      };
    }

    return function (fn) {
      var task = { fn: fn, next: undefined };
      if (last) last.next = task;
      if (!head) {
        head = task;
        notify();
      } last = task;
    };
  };

  // 25.4.1.5 NewPromiseCapability(C)


  function PromiseCapability$1(C) {
    var resolve, reject;
    this.promise = new C(function ($$resolve, $$reject) {
      if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
      resolve = $$resolve;
      reject = $$reject;
    });
    this.resolve = _aFunction$1(resolve);
    this.reject = _aFunction$1(reject);
  }

  var f$c = function (C) {
    return new PromiseCapability$1(C);
  };

  var _newPromiseCapability$1 = {
  	f: f$c
  };

  var _perform$1 = function (exec) {
    try {
      return { e: false, v: exec() };
    } catch (e) {
      return { e: true, v: e };
    }
  };

  var navigator$2 = _global$1.navigator;

  var _userAgent$1 = navigator$2 && navigator$2.userAgent || '';

  var _promiseResolve$1 = function (C, x) {
    _anObject$1(C);
    if (_isObject$1(x) && x.constructor === C) return x;
    var promiseCapability = _newPromiseCapability$1.f(C);
    var resolve = promiseCapability.resolve;
    resolve(x);
    return promiseCapability.promise;
  };

  var _redefineAll$1 = function (target, src, safe) {
    for (var key in src) _redefine$1(target, key, src[key], safe);
    return target;
  };

  var ITERATOR$9 = _wks$1('iterator');
  var SAFE_CLOSING$1 = false;

  try {
    var riter$1 = [7][ITERATOR$9]();
    riter$1['return'] = function () { SAFE_CLOSING$1 = true; };
  } catch (e) { /* empty */ }

  var _iterDetect$1 = function (exec, skipClosing) {
    if (!skipClosing && !SAFE_CLOSING$1) return false;
    var safe = false;
    try {
      var arr = [7];
      var iter = arr[ITERATOR$9]();
      iter.next = function () { return { done: safe = true }; };
      arr[ITERATOR$9] = function () { return iter; };
      exec(arr);
    } catch (e) { /* empty */ }
    return safe;
  };

  var task$1 = _task$1.set;
  var microtask$1 = _microtask$1();




  var PROMISE$1 = 'Promise';
  var TypeError$2 = _global$1.TypeError;
  var process$5 = _global$1.process;
  var versions$1 = process$5 && process$5.versions;
  var v8$1 = versions$1 && versions$1.v8 || '';
  var $Promise$1 = _global$1[PROMISE$1];
  var isNode$3 = _classof$1(process$5) == 'process';
  var empty$1 = function () { /* empty */ };
  var Internal$1, newGenericPromiseCapability$1, OwnPromiseCapability$1, Wrapper$1;
  var newPromiseCapability$1 = newGenericPromiseCapability$1 = _newPromiseCapability$1.f;

  var USE_NATIVE$2 = !!function () {
    try {
      // correct subclassing with @@species support
      var promise = $Promise$1.resolve(1);
      var FakePromise = (promise.constructor = {})[_wks$1('species')] = function (exec) {
        exec(empty$1, empty$1);
      };
      // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
      return (isNode$3 || typeof PromiseRejectionEvent == 'function')
        && promise.then(empty$1) instanceof FakePromise
        // v8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
        // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
        // we can't detect it synchronously, so just check versions
        && v8$1.indexOf('6.6') !== 0
        && _userAgent$1.indexOf('Chrome/66') === -1;
    } catch (e) { /* empty */ }
  }();

  // helpers
  var isThenable$1 = function (it) {
    var then;
    return _isObject$1(it) && typeof (then = it.then) == 'function' ? then : false;
  };
  var notify$1 = function (promise, isReject) {
    if (promise._n) return;
    promise._n = true;
    var chain = promise._c;
    microtask$1(function () {
      var value = promise._v;
      var ok = promise._s == 1;
      var i = 0;
      var run = function (reaction) {
        var handler = ok ? reaction.ok : reaction.fail;
        var resolve = reaction.resolve;
        var reject = reaction.reject;
        var domain = reaction.domain;
        var result, then, exited;
        try {
          if (handler) {
            if (!ok) {
              if (promise._h == 2) onHandleUnhandled$1(promise);
              promise._h = 1;
            }
            if (handler === true) result = value;
            else {
              if (domain) domain.enter();
              result = handler(value); // may throw
              if (domain) {
                domain.exit();
                exited = true;
              }
            }
            if (result === reaction.promise) {
              reject(TypeError$2('Promise-chain cycle'));
            } else if (then = isThenable$1(result)) {
              then.call(result, resolve, reject);
            } else resolve(result);
          } else reject(value);
        } catch (e) {
          if (domain && !exited) domain.exit();
          reject(e);
        }
      };
      while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
      promise._c = [];
      promise._n = false;
      if (isReject && !promise._h) onUnhandled$1(promise);
    });
  };
  var onUnhandled$1 = function (promise) {
    task$1.call(_global$1, function () {
      var value = promise._v;
      var unhandled = isUnhandled$1(promise);
      var result, handler, console;
      if (unhandled) {
        result = _perform$1(function () {
          if (isNode$3) {
            process$5.emit('unhandledRejection', value, promise);
          } else if (handler = _global$1.onunhandledrejection) {
            handler({ promise: promise, reason: value });
          } else if ((console = _global$1.console) && console.error) {
            console.error('Unhandled promise rejection', value);
          }
        });
        // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
        promise._h = isNode$3 || isUnhandled$1(promise) ? 2 : 1;
      } promise._a = undefined;
      if (unhandled && result.e) throw result.v;
    });
  };
  var isUnhandled$1 = function (promise) {
    return promise._h !== 1 && (promise._a || promise._c).length === 0;
  };
  var onHandleUnhandled$1 = function (promise) {
    task$1.call(_global$1, function () {
      var handler;
      if (isNode$3) {
        process$5.emit('rejectionHandled', promise);
      } else if (handler = _global$1.onrejectionhandled) {
        handler({ promise: promise, reason: promise._v });
      }
    });
  };
  var $reject$1 = function (value) {
    var promise = this;
    if (promise._d) return;
    promise._d = true;
    promise = promise._w || promise; // unwrap
    promise._v = value;
    promise._s = 2;
    if (!promise._a) promise._a = promise._c.slice();
    notify$1(promise, true);
  };
  var $resolve$1 = function (value) {
    var promise = this;
    var then;
    if (promise._d) return;
    promise._d = true;
    promise = promise._w || promise; // unwrap
    try {
      if (promise === value) throw TypeError$2("Promise can't be resolved itself");
      if (then = isThenable$1(value)) {
        microtask$1(function () {
          var wrapper = { _w: promise, _d: false }; // wrap
          try {
            then.call(value, _ctx$1($resolve$1, wrapper, 1), _ctx$1($reject$1, wrapper, 1));
          } catch (e) {
            $reject$1.call(wrapper, e);
          }
        });
      } else {
        promise._v = value;
        promise._s = 1;
        notify$1(promise, false);
      }
    } catch (e) {
      $reject$1.call({ _w: promise, _d: false }, e); // wrap
    }
  };

  // constructor polyfill
  if (!USE_NATIVE$2) {
    // 25.4.3.1 Promise(executor)
    $Promise$1 = function Promise(executor) {
      _anInstance$1(this, $Promise$1, PROMISE$1, '_h');
      _aFunction$1(executor);
      Internal$1.call(this);
      try {
        executor(_ctx$1($resolve$1, this, 1), _ctx$1($reject$1, this, 1));
      } catch (err) {
        $reject$1.call(this, err);
      }
    };
    // eslint-disable-next-line no-unused-vars
    Internal$1 = function Promise(executor) {
      this._c = [];             // <- awaiting reactions
      this._a = undefined;      // <- checked in isUnhandled reactions
      this._s = 0;              // <- state
      this._d = false;          // <- done
      this._v = undefined;      // <- value
      this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
      this._n = false;          // <- notify
    };
    Internal$1.prototype = _redefineAll$1($Promise$1.prototype, {
      // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
      then: function then(onFulfilled, onRejected) {
        var reaction = newPromiseCapability$1(_speciesConstructor$1(this, $Promise$1));
        reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
        reaction.fail = typeof onRejected == 'function' && onRejected;
        reaction.domain = isNode$3 ? process$5.domain : undefined;
        this._c.push(reaction);
        if (this._a) this._a.push(reaction);
        if (this._s) notify$1(this, false);
        return reaction.promise;
      },
      // 25.4.5.1 Promise.prototype.catch(onRejected)
      'catch': function (onRejected) {
        return this.then(undefined, onRejected);
      }
    });
    OwnPromiseCapability$1 = function () {
      var promise = new Internal$1();
      this.promise = promise;
      this.resolve = _ctx$1($resolve$1, promise, 1);
      this.reject = _ctx$1($reject$1, promise, 1);
    };
    _newPromiseCapability$1.f = newPromiseCapability$1 = function (C) {
      return C === $Promise$1 || C === Wrapper$1
        ? new OwnPromiseCapability$1(C)
        : newGenericPromiseCapability$1(C);
    };
  }

  _export$1(_export$1.G + _export$1.W + _export$1.F * !USE_NATIVE$2, { Promise: $Promise$1 });
  _setToStringTag$1($Promise$1, PROMISE$1);
  _setSpecies$1(PROMISE$1);
  Wrapper$1 = _core$1[PROMISE$1];

  // statics
  _export$1(_export$1.S + _export$1.F * !USE_NATIVE$2, PROMISE$1, {
    // 25.4.4.5 Promise.reject(r)
    reject: function reject(r) {
      var capability = newPromiseCapability$1(this);
      var $$reject = capability.reject;
      $$reject(r);
      return capability.promise;
    }
  });
  _export$1(_export$1.S + _export$1.F * (_library$1 || !USE_NATIVE$2), PROMISE$1, {
    // 25.4.4.6 Promise.resolve(x)
    resolve: function resolve(x) {
      return _promiseResolve$1(_library$1 && this === Wrapper$1 ? $Promise$1 : this, x);
    }
  });
  _export$1(_export$1.S + _export$1.F * !(USE_NATIVE$2 && _iterDetect$1(function (iter) {
    $Promise$1.all(iter)['catch'](empty$1);
  })), PROMISE$1, {
    // 25.4.4.1 Promise.all(iterable)
    all: function all(iterable) {
      var C = this;
      var capability = newPromiseCapability$1(C);
      var resolve = capability.resolve;
      var reject = capability.reject;
      var result = _perform$1(function () {
        var values = [];
        var index = 0;
        var remaining = 1;
        _forOf$1(iterable, false, function (promise) {
          var $index = index++;
          var alreadyCalled = false;
          values.push(undefined);
          remaining++;
          C.resolve(promise).then(function (value) {
            if (alreadyCalled) return;
            alreadyCalled = true;
            values[$index] = value;
            --remaining || resolve(values);
          }, reject);
        });
        --remaining || resolve(values);
      });
      if (result.e) reject(result.v);
      return capability.promise;
    },
    // 25.4.4.4 Promise.race(iterable)
    race: function race(iterable) {
      var C = this;
      var capability = newPromiseCapability$1(C);
      var reject = capability.reject;
      var result = _perform$1(function () {
        _forOf$1(iterable, false, function (promise) {
          C.resolve(promise).then(capability.resolve, reject);
        });
      });
      if (result.e) reject(result.v);
      return capability.promise;
    }
  });

  _export$1(_export$1.P + _export$1.R, 'Promise', { 'finally': function (onFinally) {
    var C = _speciesConstructor$1(this, _core$1.Promise || _global$1.Promise);
    var isFunction = typeof onFinally == 'function';
    return this.then(
      isFunction ? function (x) {
        return _promiseResolve$1(C, onFinally()).then(function () { return x; });
      } : onFinally,
      isFunction ? function (e) {
        return _promiseResolve$1(C, onFinally()).then(function () { throw e; });
      } : onFinally
    );
  } });

  /*!
   * helper-js v1.4.6
   * (c) phphe <phphe@outlook.com> (https://github.com/phphe)
   * Released under the MIT License.
   */

  function _classCallCheck$1(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties$1(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass$1(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties$1(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties$1(Constructor, staticProps);
    return Constructor;
  }

  function _defineProperty$1(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
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

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  function _superPropBase(object, property) {
    while (!Object.prototype.hasOwnProperty.call(object, property)) {
      object = _getPrototypeOf(object);
      if (object === null) break;
    }

    return object;
  }

  function _get(target, property, receiver) {
    if (typeof Reflect !== "undefined" && Reflect.get) {
      _get = Reflect.get;
    } else {
      _get = function _get(target, property, receiver) {
        var base = _superPropBase(target, property);

        if (!base) return;
        var desc = Object.getOwnPropertyDescriptor(base, property);

        if (desc.get) {
          return desc.get.call(receiver);
        }

        return desc.value;
      };
    }

    return _get(target, property, receiver || target);
  }

  function _toConsumableArray$1(arr) {
    return _arrayWithoutHoles$1(arr) || _iterableToArray$1(arr) || _nonIterableSpread$1();
  }

  function _arrayWithoutHoles$1(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

      return arr2;
    }
  }

  function _iterableToArray$1(iter) {
    if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
  }

  function _nonIterableSpread$1() {
    throw new TypeError("Invalid attempt to spread non-iterable instance");
  }

  // local store
  var store = {}; // get global
  // `this` !== global or window because of build tool

  function glb() {
    if (store.glb) {
      return store.glb;
    } else {
      // resolve global
      var t;

      try {
        t = global;
      } catch (e) {
        t = window;
      }

      store.glb = t;
      return t;
    }
  } // is 各种判断
  function isArray$2(v) {
    return Object.prototype.toString.call(v) === '[object Array]';
  }
  function isNumeric(v) {
    return isFinite(v) && !isNaN(parseFloat(v));
  }
  function isString(v) {
    return Object.prototype.toString.call(v) === '[object String]';
  }
  function isObject(v) {
    return Object.prototype.toString.call(v) === '[object Object]';
  }
  function isFunction(v) {
    return typeof v === 'function';
  }
  function isPromise(v) {
    return Object.prototype.toString.call(v) === '[object Promise]';
  }

  function numRand(min, max) {
    if (arguments.length === 1) {
      max = min;
      min = 0;
    }

    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  function kebabCase(str) {
    return str.replace(/ /g, '-').replace(/_/g, '-').replace(/([A-Z])/g, '-$1').replace(/--+/g, '-').replace(/^-|-$|/g, '').toLowerCase();
  }
  function snakeCase(str) {
    return kebabCase(str).replace(/-/g, '_');
  }
  function strRand() {
    var len = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 8;
    var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    var r = '';
    var seeds = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < len; i++) {
      r += seeds[numRand(seeds.length - 1)];
    }

    return prefix + r;
  }

  function arrayRemove(arr, v) {
    var index;
    var count = 0;

    while ((index = arr.indexOf(v)) > -1) {
      arr.splice(index, 1);
      count++;
    }

    return count;
  }
  // todo change reverse to opt in next version

  function forAll(val, handler, reverse) {
    if (!reverse) {
      if (isArray$2(val) || isString(val)) {
        for (var i = 0; i < val.length; i++) {
          if (handler(val[i], i) === false) {
            break;
          }
        }
      } else if (isObject(val)) {
        for (var _i2 = 0, _Object$keys = Object.keys(val); _i2 < _Object$keys.length; _i2++) {
          var key = _Object$keys[_i2];

          if (handler(val[key], key) === false) {
            break;
          }
        }
      } else if (Number.isInteger(val)) {
        for (var _i3 = 0; _i3 < val; _i3++) {
          if (handler(_i3, _i3) === false) {
            break;
          }
        }
      }
    } else {
      if (isArray$2(val) || isString(val)) {
        for (var _i4 = val.length - 1; _i4 >= 0; _i4--) {
          if (handler(val[_i4], _i4) === false) {
            break;
          }
        }
      } else if (isObject(val)) {
        var keys = Object.keys(val);
        keys.reverse();

        for (var _i5 = 0, _keys = keys; _i5 < _keys.length; _i5++) {
          var _key = _keys[_i5];

          if (handler(val[_key], _key) === false) {
            break;
          }
        }
      } else if (Number.isInteger(val)) {
        for (var _i6 = val - 1; _i6 >= 0; _i6--) {
          if (handler(_i6, _i6) === false) {
            break;
          }
        }
      }
    }
  } // source: http://stackoverflow.com/questions/8817394/javascript-get-deep-value-from-object-by-passing-path-to-it-as-string
  function promiseTimeout(promise, timeout) {
    return new Promise(function (resolve, reject) {
      var t, rejected;
      promise.then(function () {
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
  } // url

  function onDOM(el, name, handler) {
    for (var _len5 = arguments.length, args = new Array(_len5 > 3 ? _len5 - 3 : 0), _key6 = 3; _key6 < _len5; _key6++) {
      args[_key6 - 3] = arguments[_key6];
    }

    if (el.addEventListener) {
      // 所有主流浏览器，除了 IE 8 及更早 IE版本
      el.addEventListener.apply(el, [name, handler].concat(args));
    } else if (el.attachEvent) {
      // IE 8 及更早 IE 版本
      el.attachEvent.apply(el, ["on".concat(name), handler].concat(args));
    }
  }
  function waitTime(milliseconds, callback) {
    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        callback && callback();
        resolve();
      }, milliseconds);
    });
  } // overload waitFor(condition, time = 100, maxCount = 1000))
  var URLHelper =
  /*#__PURE__*/
  function () {
    // protocol, hostname, port, pastname
    function URLHelper(baseUrl) {
      var _this3 = this;

      _classCallCheck$1(this, URLHelper);

      _defineProperty$1(this, "baseUrl", '');

      _defineProperty$1(this, "search", {});

      var t = decodeURI(baseUrl).split('?');
      this.baseUrl = t[0];

      if (t[1]) {
        t[1].split('&').forEach(function (v) {
          var t2 = v.split('=');
          _this3.search[t2[0]] = t2[1] == null ? '' : decodeURIComponent(t2[1]);
        });
      }
    }

    _createClass$1(URLHelper, [{
      key: "getHref",
      value: function getHref() {
        var _this4 = this;

        var t = [this.baseUrl];
        var searchStr = Object.keys(this.search).map(function (k) {
          return "".concat(k, "=").concat(encodeURIComponent(_this4.search[k]));
        }).join('&');

        if (searchStr) {
          t.push(searchStr);
        }

        return t.join('?');
      }
    }]);

    return URLHelper;
  }(); // 解析函数参数, 帮助重载

  var EventProcessor =
  /*#__PURE__*/
  function () {
    function EventProcessor() {
      _classCallCheck$1(this, EventProcessor);

      _defineProperty$1(this, "eventStore", []);
    }

    _createClass$1(EventProcessor, [{
      key: "on",
      value: function on(name, handler) {
        this.eventStore.push({
          name: name,
          handler: handler
        });
      }
    }, {
      key: "once",
      value: function once(name, handler) {
        var _this5 = this;

        var off = function off() {
          _this5.off(name, wrappedHandler);
        };

        var wrappedHandler = function wrappedHandler() {
          handler.apply(void 0, arguments);
          off();
        };

        this.on(name, wrappedHandler);
        return off;
      }
    }, {
      key: "onceTimeout",
      value: function onceTimeout(name, handler, timeout) {
        var _this6 = this;

        var off;
        var promise = new Promise(function (resolve, reject) {
          var wrappedHandler = function wrappedHandler() {
            handler.apply(void 0, arguments);
            resolve();
          };

          off = _this6.once(name, wrappedHandler);
          waitTime(timeout).then(function () {
            off();
            reject();
          });
        });

        var off2 = function off2() {
          off && off();
        };

        return {
          off: off2,
          promise: promise
        };
      }
    }, {
      key: "off",
      value: function off(name, handler) {
        var indexes = []; // to remove indexes; reverse; 倒序的

        var len = this.eventStore.length;

        for (var i = 0; i < len; i++) {
          var item = this.eventStore[i];

          if (item.name === name && item.handler === handler) {
            indexes.unshift(i);
          }
        }

        for (var _i8 = 0, _indexes = indexes; _i8 < _indexes.length; _i8++) {
          var index = _indexes[_i8];
          this.eventStore.splice(index, 1);
        }
      }
    }, {
      key: "emit",
      value: function emit(name) {
        // 重要: 先找到要执行的项放在新数组里, 因为执行项会改变事件项存储数组
        var items = [];
        var _iteratorNormalCompletion9 = true;
        var _didIteratorError9 = false;
        var _iteratorError9 = undefined;

        try {
          for (var _iterator9 = this.eventStore[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
            var item = _step9.value;

            if (item.name === name) {
              items.push(item);
            }
          }
        } catch (err) {
          _didIteratorError9 = true;
          _iteratorError9 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion9 && _iterator9["return"] != null) {
              _iterator9["return"]();
            }
          } finally {
            if (_didIteratorError9) {
              throw _iteratorError9;
            }
          }
        }

        for (var _len8 = arguments.length, args = new Array(_len8 > 1 ? _len8 - 1 : 0), _key9 = 1; _key9 < _len8; _key9++) {
          args[_key9 - 1] = arguments[_key9];
        }

        for (var _i9 = 0, _items = items; _i9 < _items.length; _i9++) {
          var _item = _items[_i9];

          _item.handler.apply(_item, args);
        }
      }
    }]);

    return EventProcessor;
  }();
  var CrossWindowEventProcessor =
  /*#__PURE__*/
  function (_EventProcessor) {
    _inherits(CrossWindowEventProcessor, _EventProcessor);

    // id
    function CrossWindowEventProcessor(opt) {
      var _this7;

      _classCallCheck$1(this, CrossWindowEventProcessor);

      _this7 = _possibleConstructorReturn(this, _getPrototypeOf(CrossWindowEventProcessor).call(this));

      _defineProperty$1(_assertThisInitialized(_this7), "storageName", '_crossWindow');

      _defineProperty$1(_assertThisInitialized(_this7), "windows", []);

      _defineProperty$1(_assertThisInitialized(_this7), "timeout", 200);

      _defineProperty$1(_assertThisInitialized(_this7), "BROADCAST", '__BROADCAST__');

      if (opt) {
        Object.assign(_assertThisInitialized(_this7), opt);
      }

      onDOM(window, 'storage', function (ev) {
        if (ev.key === _this7.storageName) {
          var event = JSON.parse(ev.newValue);

          if (!event.targets || event.targets.includes(_this7.id)) {
            var _this8;

            (_this8 = _this7).emitLocal.apply(_this8, [event.name].concat(_toConsumableArray$1(event.args)));
          }
        }
      }); // social parts 集体部分
      // join

      _this7.id = strRand();
      _this7.windows = [_this7.id];
      _this7.ready = new Promise(function (resolve, reject) {
        _this7.onceTimeout('_windows_updated', function (_ref) {
          var windows = _ref.windows;
          _this7.windows = windows;
        }, _this7.timeout).promise.then(function () {
          resolve(); // responsed 被响应
        }, function () {
          // no response 无响应
          resolve();
        });

        _this7.broadcast('_join', _this7.id);
      });

      _this7.ready.then(function () {
        // on join
        _this7.on('_join', function (id) {
          _this7.windows.push(id);

          if (_this7.isMain()) {
            _this7.broadcast('_windows_updated', {
              windows: _this7.windows,
              type: 'join',
              id: id
            });
          }
        }); // on _windows_updated


        _this7.on('_windows_updated', function (_ref2) {
          var windows = _ref2.windows;
          _this7.windows = windows;
        }); // on exit


        _this7.on('_exit', function (id) {
          var oldMain = _this7.windows[0];
          arrayRemove(_this7.windows, id);

          if (_this7.isMain()) {
            _this7.emit('_windows_updated', {
              windows: _this7.windows,
              type: 'exit',
              id: id
            });

            if (oldMain != _this7.id) {
              console.log('_main_updated');

              _this7.emit('_main_updated', {
                windows: _this7.windows,
                old: oldMain,
                'new': _this7.id
              });
            }
          }
        });

        onDOM(window, 'beforeunload', function () {
          _this7.exitGroup();
        });
      });

      return _this7;
    }

    _createClass$1(CrossWindowEventProcessor, [{
      key: "isMain",
      value: function isMain() {
        return this.id === this.windows[0];
      }
    }, {
      key: "emitTo",
      value: function emitTo(name, targets) {
        for (var _len9 = arguments.length, args = new Array(_len9 > 2 ? _len9 - 2 : 0), _key10 = 2; _key10 < _len9; _key10++) {
          args[_key10 - 2] = arguments[_key10];
        }

        if (targets === this.BROADCAST) {
          targets = null;
        } else {
          if (targets && !isArray$2(targets)) {
            targets = [targets];
          }

          if (targets.includes(this.id)) {
            var _get2;

            (_get2 = _get(_getPrototypeOf(CrossWindowEventProcessor.prototype), "emit", this)).call.apply(_get2, [this, name].concat(args)); // emit to current window

          }
        }

        glb().localStorage.setItem(this.storageName, JSON.stringify({
          name: name,
          targets: targets,
          args: args,
          // use random make storage event triggered every time
          // 加入随机保证触发storage事件
          random: Math.random()
        }));
      }
    }, {
      key: "emitLocal",
      value: function emitLocal(name) {
        for (var _len10 = arguments.length, args = new Array(_len10 > 1 ? _len10 - 1 : 0), _key11 = 1; _key11 < _len10; _key11++) {
          args[_key11 - 1] = arguments[_key11];
        }

        this.emitTo.apply(this, [name, this.id].concat(args));
      }
    }, {
      key: "broadcast",
      value: function broadcast(name) {
        for (var _len11 = arguments.length, args = new Array(_len11 > 1 ? _len11 - 1 : 0), _key12 = 1; _key12 < _len11; _key12++) {
          args[_key12 - 1] = arguments[_key12];
        }

        this.emitTo.apply(this, [name, this.BROADCAST].concat(args));
      }
    }, {
      key: "emit",
      value: function emit(name) {
        for (var _len12 = arguments.length, args = new Array(_len12 > 1 ? _len12 - 1 : 0), _key13 = 1; _key13 < _len12; _key13++) {
          args[_key13 - 1] = arguments[_key13];
        }

        this.emitTo.apply(this, [name, this.windows].concat(args));
      }
    }, {
      key: "exitGroup",
      value: function exitGroup() {
        this.broadcast('_exit', this.id);
      }
    }]);

    return CrossWindowEventProcessor;
  }(EventProcessor); // Deprecated in next version

  /*!
   * vue-functions v1.0.5
   * (c) phphe <phphe@outlook.com> (https://github.com/phphe)
   * Released under the MIT License.
   */

  function watchAsync(vm, getter, handler, opt) {
    var destroies = [];
    var value, oldValue;
    var count = -1; // updated count

    main();
    return destroy;

    function destroy() {
      destroies.forEach(function (f) {
        return f();
      });
      destroies = [];
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
      destroy();
      var result = getter.call(vm, exec);
      count++;
      var localCount = count;
      oldValue = value;

      var getterExecuted = function getterExecuted(value) {
        if (localCount !== count) {
          // expired
          return;
        }

        if (localCount === 0) {
          if (opt && opt.immediate) {
            handler.call(vm, value, oldValue);
          }
        } else {
          handler.call(vm, value, oldValue);
        }
      }; //


      if (isPromise(result)) {
        result.then(getterExecuted);
      } else {
        getterExecuted(result);
      }
    }
  } // do handler first, handler return getter
  function* iterateObjectWithoutDollarDash(obj) {
    for (var key in obj) {
      var start = key.substr(0, 1);

      if (start !== '$' && start !== '_') {
        yield {
          key: key,
          value: obj[key]
        };
      }
    }
  } // add reactive `windowSize`

  // 21.2.5.3 get RegExp.prototype.flags()
  if (_descriptors$1 && /./g.flags != 'g') _objectDp$1.f(RegExp.prototype, 'flags', {
    configurable: true,
    get: _flags
  });

  var TO_STRING = 'toString';
  var $toString = /./[TO_STRING];

  var define = function (fn) {
    _redefine$1(RegExp.prototype, TO_STRING, fn, true);
  };

  // 21.2.5.14 RegExp.prototype.toString()
  if (_fails$1(function () { return $toString.call({ source: 'a', flags: 'b' }) != '/a/b'; })) {
    define(function toString() {
      var R = _anObject$1(this);
      return '/'.concat(R.source, '/',
        'flags' in R ? R.flags : !_descriptors$1 && R instanceof RegExp ? _flags.call(R) : undefined);
    });
  // FF44- RegExp#toString has a wrong name
  } else if ($toString.name != TO_STRING) {
    define(function toString() {
      return $toString.call(this);
    });
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
              var newKeys = keys$2(children);

              needDelete = keys$2(old).filter(function (key) {
                return !newKeys.includes(key);
              });
            } else {
              needDelete = keys$2(old);
            }

            needDelete.forEach(function (key) {
              _this.$delete(key);
            });
          }

          if (children) {
            keys$2(children).forEach(function (key) {
              if (old && old[key]) {
                assign$1(_this[key], children[key]);

                children[key] = _this[key];
              } else {
                children[key] = new cls(_this.$vm, children[key], _this.$globalConfig, _this, key, _this.$validation);
                children[key]._notBaseStarted = true;

                _this.$vm.$set(_this, key, children[key]);
              }
            });

            _this.$children = keys$2(children).length > 0 ? children : null;

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
            var t = findParent$1(_this2, function (field) {
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

          if (!rules$$1 || keys$2(rules$$1).length === 0) {
            return;
          }

          return exec(function () {
            var _loop2 = function _loop2(name) {
              var ruleInfo = rules$$1[name];

              if (!isObject(ruleInfo)) {
                ruleInfo = {
                  params: isArray$2(ruleInfo) ? ruleInfo : [ruleInfo]
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
          if (findParent$1(_this4, function (field) {
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

        keys$2(rules$$1).forEach(function (key) {
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
  function findParent$1(field, handler) {
    var current = field;

    while (current) {
      if (handler(current)) {
        return current;
      }

      current = current.$parent;
    }
  }

  exports.VueFinalValidateField = VueFinalValidateField;
  exports.cls = cls;
  exports.makeMountPoint = makeMountPoint;
  exports.getDefaultConfig = getDefaultConfig;
  exports.makeValidateMethod = makeValidateMethod;
  exports.listenUserInput = listenUserInput;
  exports.default = install;
  exports.findParent = findParent$1;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
