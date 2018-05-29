const Promise             = require('bluebird');
const { NefitEasyClient } = require('nefit-easy-core');
const utils               = require('./utils');

class NefitEasyCommands extends NefitEasyClient {}

Object.assign(NefitEasyCommands.prototype, require('require-all')(__dirname + '/commands'));

module.exports = function(opts) {
  return new NefitEasyCommands(opts);
};

module.exports.NefitEasyCommands = NefitEasyCommands;
