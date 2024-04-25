/**
 * This source was copied from https://github.com/cars10/elasticvue/blob/master/src/helpers/json/jsonBigint.ts
 */
import JsonBigInt from 'json-bigint'

export const bigint = JsonBigInt({ protoAction: 'preserve', constructorAction: 'preserve', useNativeBigInt: false })
