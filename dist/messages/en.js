/*!
 * vue-final-validate v1.0.3
 * (c) 2017-present phphe <phphe@outlook.com>
 * Released under the MIT License.
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.VueFinalValidateMessagesEn = factory());
}(this, (function () { 'use strict';

  var en = {
    accepted: 'The :name must be accepted.',
    alpha: 'The :name may only contain letters.',
    alphaDash: 'The :name may only contain letters, numbers, and dashes.',
    alphaNum: 'The :name may only contain letters and numbers.',
    between: 'The :name must be between :fieldName(:params[0]) and :fieldName(:params[1]).',
    different: 'The :name and :fieldName(:params[0]) must be different.',
    email: 'The :name must be a valid email address.',
    in: 'The selected :name is invalid.',
    integer: 'The :name must be an integer.',
    length: 'The :name length must be :params[0].',
    lengthBetween: 'The :name length must be between :params[0] and :params[1].',
    max: 'The :name may not be greater than :params[0].',
    maxLength: 'The :name length may not be greater than :params[0].',
    min: 'The :name must be at least :params[0].',
    minLength: 'The :name length must be at least :params[0].',
    notIn: 'The selected :name is invalid.',
    numeric: 'The :name must be a number.',
    regex: 'The :name format is invalid.',
    required: 'The :name field is required.',
    requiredIfField: function requiredIfField(value, params, field) {
      var relatedField = ruleReturn;
      return "The :name is required if ".concat(relatedField.$name, " not empty.");
    },
    requiredIf: 'The :name field is required.',
    same: function same(value, params, field, ruleReturn) {
      var relatedField = ruleReturn;
      return "The :name and ".concat(relatedField.$name, " must match.");
    }
  };

  return en;

})));
