/**
 * This source was copied from https://github.com/cars10/elasticvue/blob/master/src/helpers/json/stringify.ts
 */
import { bigint } from './jsonBigint'

export const stringifyJson = (json: object, ...args: any[]): string => {
  return bigint.stringify(json, ...args)
}
