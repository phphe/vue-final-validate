export default {
  accepted: `您必须同意:name才能继续。`,
  alpha: `:name仅能包含字母。`,
  alphaDash: `:name仅能包含字母，数字，破折号和下划线。`,
  alphaNum: `:name仅能包含字母和数字。`,
  between: `:name必须在:fieldName(:params[0])和:fieldName(:params[1])之间。`,
  different: `:name不能与:fieldName(:params[0])相同。`,
  email: `:name不是一个正确的邮箱。`,
  in: `选择的:name不可用。`,
  integer: `:name必须是整数。`,
  length: `:name的长度必须是:params[0]。`,
  lengthBetween: `:name的长度须在:params[0]和:params[1]之间。`,
  max: `:name不能超过:params[0]。`,
  maxLength: `:name的长度不能超过:params[0]。`,
  min: `:name不能低于:params[0]。`,
  minLength: `:name的长度不能低于:params[0]。`,
  notIn: `选择的:name不可用。`,
  numeric: `:name不是一个正确的数字。`,
  regex: `:name格式错误。`,
  required: `请填写:name。`,
  requiredIfField(value, params, field, ruleReturn) {
    const relatedField = ruleReturn
    return `当${relatedField.$name}不为空时:name必填。`
  },
  requiredIf: `请填写:name。`,
  same(value, params, field, ruleReturn) {
    const relatedField = ruleReturn
    return `:name必须与${relatedField.$name}相同。`
  },
}
