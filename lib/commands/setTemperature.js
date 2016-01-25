const Promise    = require('bluebird');
const SPECIFIERS = {
  '>' : (a, b) => a > b,
  '<' : (a, b) => a < b,
};

module.exports = function setTemperature(value) {
  return parseValue.call(this, value).then((value) => {
    if (! value) {
      return { status : 'current value already meets specification' };
    }
    var data = { value : value };
    return Promise.all([
      this.put('/heatingCircuits/hc1/temperatureRoomManual',          data),
      this.put('/heatingCircuits/hc1/manualTempOverride/status',      { value : 'on' }),
      this.put('/heatingCircuits/hc1/manualTempOverride/temperature', data),
    ]).then(() => {
      return { status : 'ok' };
    });
  });
};

function parseValue(value) {
  if (typeof value === 'number') return Promise.resolve(value);
  if (typeof value !== 'string') return Promise.resolve(null);

  // Check for a specifier.
  var m = /^(?:(\D*?)\s*)([\d.]+)/.exec(value);

  // No match or no (valid) specifier: try to convert to a number and be done.
  if (! m || ! m[1] || !(m[1] in SPECIFIERS)) return Promise.resolve(Number(m ? m[2] : value));

  // If a valid specifier was found, we need to retrieve the current status.
  var specifier  = m[1];
  var targetTemp = Number(m[2]);
  return this.status().then((status) => {
    // Determine the currently set temperature, according to the active user mode.
    var temp = Number(status[ status['user mode'] === 'manual' ? 'temp manual setpoint' : 'temp setpoint' ]);

    // Check the currently set temperature against the specifier, and if it
    // fails, set a new temperature. Otherwise, leave as-is.
    return SPECIFIERS[specifier](temp, targetTemp) ? null : targetTemp;
  });
}
