export const _get = (
  data: any,
  path: string | string[],
  defaultValue: any,
  seprator = '.',
) => {
  if (data) {
    const properties = Array.isArray(path) ? path : path.split(seprator)
    return properties.reduce(
      (value: any, path: string) => value && value[path],
      data,
    )
  }
  return defaultValue
}
