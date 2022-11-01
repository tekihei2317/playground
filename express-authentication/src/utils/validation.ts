export function validateRequired(attribute: string, value: unknown) {
  if (value == undefined) {
    return `${attribute}は必須です`;
  }
}

export function validateString(attribute: string, value: unknown) {
  if (typeof value !== "string") {
    return `${attribute}は文字列で指定してください`;
  }
}
