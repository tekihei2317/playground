import { z, ZodIssueCode } from "zod";

// 参考: https://zenn.dev/hisho/articles/e8f809db5415e8
const customErrorMap: z.ZodErrorMap = (issue, ctx) => {
  let message: string;

  switch (issue.code) {
    case ZodIssueCode.invalid_type:
      if (issue.received === "undefined") {
        message = "必須";
      } else {
        message = `${issue.expected}を指定してください`;
      }
      break;
    case ZodIssueCode.unrecognized_keys:
      message = `Unrecognized key(s) in object: ${issue.keys
        .map((k) => `'${k}'`)
        .join(", ")}`;
      break;
    case ZodIssueCode.invalid_union:
      message = `Invalid input`;
      break;
    case ZodIssueCode.invalid_union_discriminator:
      message = `Invalid discriminator value. Expected ${issue.options
        .map((val) => (typeof val === "string" ? `'${val}'` : val))
        .join(" | ")}`;
      break;
    case ZodIssueCode.invalid_enum_value:
      message = `Invalid enum value. Expected ${issue.options
        .map((val) => (typeof val === "string" ? `'${val}'` : val))
        .join(" | ")}`;
      break;
    case ZodIssueCode.invalid_arguments:
      message = `Invalid function arguments`;
      break;
    case ZodIssueCode.invalid_return_type:
      message = `Invalid function return type`;
      break;
    case ZodIssueCode.invalid_date:
      message = `Invalid date`;
      break;
    case ZodIssueCode.invalid_string:
      if (issue.validation !== "regex")
        message = `有効な${issue.validation}を指定してください`;
      else message = "Invalid";
      break;
    case ZodIssueCode.too_small:
      if (issue.type === "array")
        message = `Array must contain ${
          issue.inclusive ? `at least` : `more than`
        } ${issue.minimum} element(s)`;
      else if (issue.type === "string")
        message = `${issue.minimum}文字${
          issue.inclusive ? "以上で" : "より長く"
        }指定してください`;
      else if (issue.type === "number")
        message = `Number must be greater than ${
          issue.inclusive ? `or equal to ` : ``
        }${issue.minimum}`;
      else message = "Invalid input";
      break;
    case ZodIssueCode.too_big:
      if (issue.type === "array")
        message = `Array must contain ${
          issue.inclusive ? `at most` : `less than`
        } ${issue.maximum} element(s)`;
      else if (issue.type === "string")
        message = `String must contain ${
          issue.inclusive ? `at most` : `under`
        } ${issue.maximum} character(s)`;
      else if (issue.type === "number")
        message = `Number must be less than ${
          issue.inclusive ? `or equal to ` : ``
        }${issue.maximum}`;
      else message = "Invalid input";
      break;
    case ZodIssueCode.custom:
      message = `Invalid input`;
      break;
    case ZodIssueCode.invalid_intersection_types:
      message = `Intersection results could not be merged`;
      break;
    case ZodIssueCode.not_multiple_of:
      message = `Number must be a multiple of ${issue.multipleOf}`;
      break;
    default:
      message = ctx.defaultError;
  }
  return { message };
};

z.setErrorMap(customErrorMap);

export { z };
