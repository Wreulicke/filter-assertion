"use strict";
var find = require('lodash.find');
var assertion = require('assert');
var assert;
var predicateFactory = function (expected) {
    if (expected == null)
        throw Error('expected is not allowed null or undefined');
    if (typeof expected === 'object') {
        return assert(expected);
    }
    else
        return function (actual) { return expected === actual; };
};
assert = function (schema) {
    var predicateMap = Object.keys(schema).map(function (key) {
        var predicate = (typeof schema[key] === 'function') ? schema[key] : predicateFactory(schema[key]);
        return {
            key: key,
            reg: new RegExp(key),
            predicate: predicate
        };
    });
    return function (actual) {
        var actualInfos = Object.keys(actual).reduce(function (result, key) {
            var predicate = find(predicateMap, function (regMap) {
                return regMap.reg.test(key);
            });
            result.push({
                key: key,
                value: actual[key],
                predicateInfo: predicate
            });
            return result;
        }, []);
        actualInfos.forEach(function (info) {
            console.log(info);
            assertion(info.predicateInfo.predicate(info.value, info.key, info.predicateInfo));
        });
    };
};
module.exports = assert;
