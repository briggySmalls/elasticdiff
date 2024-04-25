/**
 * This source was copied from https://github.com/cars10/elasticvue/blob/master/src/helpers/json/parse.ts
 */
import { bigint } from './jsonBigint'

export const removeComments = (str: string): string => {
  return str.replace(/\\"|"(?:\\"|[^"])*"|(\/\/.*|\/\*[\s\S]*?\*\/)/g, (m, g) => g ? '' : m)
}

export const parseJson = (jsonString: string): any => {
  const clean = removeComments(jsonString)
  return bigint.parse(clean)
}
