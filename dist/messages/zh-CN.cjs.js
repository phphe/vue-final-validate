/*!
 * vue-final-validate v1.0.3
 * (c) 2017-present phphe <phphe@outlook.com>
 * Released under the MIT License.
 */
'use strict';

var zhCN = {
  accepted: "\u60A8\u5FC5\u987B\u540C\u610F:name\u624D\u80FD\u7EE7\u7EED\u3002",
  alpha: ":name\u4EC5\u80FD\u5305\u542B\u5B57\u6BCD\u3002",
  alphaDash: ":name\u4EC5\u80FD\u5305\u542B\u5B57\u6BCD\uFF0C\u6570\u5B57\uFF0C\u7834\u6298\u53F7\u548C\u4E0B\u5212\u7EBF\u3002",
  alphaNum: ":name\u4EC5\u80FD\u5305\u542B\u5B57\u6BCD\u548C\u6570\u5B57\u3002",
  between: ":name\u5FC5\u987B\u5728:fieldName(:params[0])\u548C:fieldName(:params[1])\u4E4B\u95F4\u3002",
  different: ":name\u4E0D\u80FD\u4E0E:fieldName(:params[0])\u76F8\u540C\u3002",
  email: ":name\u4E0D\u662F\u4E00\u4E2A\u6B63\u786E\u7684\u90AE\u7BB1\u3002",
  in: "\u9009\u62E9\u7684:name\u4E0D\u53EF\u7528\u3002",
  integer: ":name\u5FC5\u987B\u662F\u6574\u6570\u3002",
  length: ":name\u7684\u957F\u5EA6\u5FC5\u987B\u662F:params[0]\u3002",
  lengthBetween: ":name\u7684\u957F\u5EA6\u987B\u5728:params[0]\u548C:params[1]\u4E4B\u95F4\u3002",
  max: ":name\u4E0D\u80FD\u8D85\u8FC7:params[0]\u3002",
  maxLength: ":name\u7684\u957F\u5EA6\u4E0D\u80FD\u8D85\u8FC7:params[0]\u3002",
  min: ":name\u4E0D\u80FD\u4F4E\u4E8E:params[0]\u3002",
  minLength: ":name\u7684\u957F\u5EA6\u4E0D\u80FD\u4F4E\u4E8E:params[0]\u3002",
  notIn: "\u9009\u62E9\u7684:name\u4E0D\u53EF\u7528\u3002",
  numeric: ":name\u4E0D\u662F\u4E00\u4E2A\u6B63\u786E\u7684\u6570\u5B57\u3002",
  regex: ":name\u683C\u5F0F\u9519\u8BEF\u3002",
  required: "\u8BF7\u586B\u5199:name\u3002",
  requiredIfField: function requiredIfField(value, params, field, ruleReturn) {
    var relatedField = ruleReturn;
    return "\u5F53".concat(relatedField.$name, "\u4E0D\u4E3A\u7A7A\u65F6:name\u5FC5\u586B\u3002");
  },
  requiredIf: "\u8BF7\u586B\u5199:name\u3002",
  same: function same(value, params, field, ruleReturn) {
    var relatedField = ruleReturn;
    return ":name\u5FC5\u987B\u4E0E".concat(relatedField.$name, "\u76F8\u540C\u3002");
  }
};

module.exports = zhCN;
