// Generated by CoffeeScript 1.11.1
(function() {
  module.exports = {
    pull: function(arr, v) {
      var index;
      index = arr.indexOf(v);
      if (index > -1) {
        return arr.splice(index, 1);
      } else {
        return false;
      }
    },
    values: function(obj) {
      var k, v, values;
      values = [];
      for (k in obj) {
        v = obj[k];
        values.push(v);
      }
      return values;
    },
    findIndex: function(arr, cb) {
      var k, key, v;
      key = -1;
      for (k in arr) {
        v = arr[k];
        if (cb(v, k)) {
          key = k;
          break;
        }
      }
      return key;
    },
    has: function(obj, k) {
      return obj.hasOwnProperty(k);
    },
    mapValues: function(obj, cb) {
      var k, v, values;
      values = {};
      for (k in obj) {
        v = obj[k];
        values[k] = cb(v, k);
      }
      return values;
    },
    forEach: function(arr, cb) {
      var k, v;
      for (k in arr) {
        v = arr[k];
        cb(v, k);
      }
    },
    forIn: function(obj, cb) {
      var i, k, r, v;
      i = 0;
      for (k in obj) {
        v = obj[k];
        r = cb(v, k, i);
        i++;
        if (r === false) {
          break;
        }
      }
    }
  };

}).call(this);
