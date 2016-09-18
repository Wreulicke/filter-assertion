import * as find from 'lodash.find';
import * as assertion from 'assert';

export interface AssertionFactory {
  (schema: any): (actual: any) => void;
}
interface PredicateInfo {
  key: String;
  reg: RegExp;
  predicate: (...args: any[]) => boolean;
}
interface InternalActualInfo {
  key: String;
  value: any;
  predicateInfo: PredicateInfo;
}
let assert: AssertionFactory;
const predicateFactory: (expected: any) => (actual: any) => void = (expected: any) => {
  if (expected == null) throw Error('expected is not allowed null or undefined');
  if (typeof expected === 'object') {
    return assert(expected);
  } else return (actual: any) => expected === actual;
};
assert = function(schema) {
  const predicateMap: PredicateInfo[] = Object.keys(schema).map((key) => {
    const predicate = (typeof schema[key] === 'function') ? schema[key] : predicateFactory(schema[key]);
    return {
      key: key,
      reg: new RegExp(key),
      predicate: predicate
    };
  });
  return function(actual) {
    const actualInfos = Object.keys(actual).reduce((result, key) => {
      const predicate = find(predicateMap, (regMap) => {
        return regMap.reg.test(key);
      });
      result.push({
        key: key,
        value: actual[key],
        predicateInfo: predicate
      });
      return result;
    }, < InternalActualInfo[] > []);
    actualInfos.forEach((info) => {
      console.log(info);
      assertion(info.predicateInfo.predicate(info.value, info.key, info.predicateInfo));
    });
  };
};
module.exports = assert;