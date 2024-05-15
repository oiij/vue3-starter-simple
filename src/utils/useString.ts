export function hyphenToCamelCase(str: string) {
  return str.replace(/-([a-z])/g, (match, letter) => {
    return letter.toUpperCase()
  })
}
export function toUpperCamelCase(str: string) {
  return str.replace(/-([a-z])/g, (match, group1) => {
    return group1.toUpperCase()
  }).replace(/^([a-z])/, (match, group1) => {
    return group1.toUpperCase()
  })
}
