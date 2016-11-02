'use strict';
const status = require('./status');

module.exports = function setHotWaterSupply(value) {
  return status.call(this, true).then(status => {
    let endpoint = status['user mode'] === 'clock' ? 'dhwOperationClockMode' : 'dhwOperationManualMode';
    return this.put('/dhwCircuits/dhwA/' + endpoint, { value : value });
  }).then(() => {
    return { status : 'ok' };
  });
}
