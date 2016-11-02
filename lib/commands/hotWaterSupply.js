'use strict';
const status = require('./status');

module.exports = function hotWaterSupply() {
  return status.call(this, true).then(status => {
    let endpoint = status['user mode'] === 'clock' ? 'dhwOperationClockMode' : 'dhwOperationManualMode';
    return this.get('/dhwCircuits/dhwA/' + endpoint);
  }).then(r => {
    return { value : r.value };
  });
}
