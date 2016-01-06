const Promise       = require('bluebird');
const NefitEasyCore = require('nefit-easy-core');
const utils         = require('./utils');

const NefitEasyClient = module.exports = function NefitEasyClient(opts) {
  if (! (this instanceof NefitEasyClient)) {
    return new NefitEasyClient(opts);
  }
  NefitEasyCore.apply(this, arguments);
};

NefitEasyClient.prototype             = Object.create(NefitEasyCore.prototype);
NefitEasyClient.prototype.constructor = NefitEasyClient;

Object.assign(NefitEasyClient.prototype, require('require-all')(__dirname + '/commands'));
