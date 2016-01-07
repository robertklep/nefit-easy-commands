const Promise = require('bluebird');
const CODES   = require('../data/display-codes.json');

module.exports = function displayCode() {
  return Promise.all([
    this.get('/system/appliance/displaycode'),
    this.get('/system/appliance/causecode'),
  ]).spread((displayCode, causeCode) => {
    var matches = CODES.filter((code) => code.status == displayCode.value && code.code == causeCode.value);
    return {
      code  : displayCode.value,
      cause : causeCode.value,
      description : matches.length ? matches[0].description : null,
      action      : matches.length ? matches[0].action      : null,
    };
  });
};
