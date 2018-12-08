const Promise    = require('bluebird');
const SPECIFIERS = {
  '>' : (s, t, p) => s > p ? null : p,
  '<' : (s, t, p) => s < p ? null : p,
  '+' : (s, t, p) => s + p,
  '-' : (s, t, p) => s - p,
  't+' : (s, t, p) => t + p,
  't-' : (s, t, p) => t - p,
};

module.exports = function setTemperature(value) {
  return parseValue.call(this, value).then((value) => {
    if (! value)
    {
        return { status : 'provided value not useable'};
    }
    if (! value.newSetpoint) {
      return { status : 'current value already meets specification',
               newSetpoint: value.newSetpoint,
               previousSetpoint: value.previousSetpoint,
               currentTemperature: value.currentTemperature };
    }
    var data = { value : value.newSetpoint };
    return Promise.all([
      this.put('/heatingCircuits/hc1/temperatureRoomManual',          data),
      this.put('/heatingCircuits/hc1/manualTempOverride/status',      { value : 'on' }),
      this.put('/heatingCircuits/hc1/manualTempOverride/temperature', data),
    ]).then(() => {
      return { status : 'ok',
               newSetpoint: value.newSetpoint,
               previousSetpoint: value.previousSetpoint,
               currentTemperature: value.currentTemperature };
    });
  });
};

function parseValue(value) {
  if (typeof value === 'number') return Promise.resolve({ newSetpoint: value});
  if (typeof value !== 'string') return Promise.resolve(null);

  // Check for a specifier.
  var m = /^(?:(\D*?)\s*)([\d.]+)/.exec(value);

  // No match or no (valid) specifier: try to convert to a number and be done.
  if (! m || ! m[1] || !(m[1] in SPECIFIERS)) 
    return Promise.resolve({ newSetpoint: Number(m ? m[2] : value)});

  // If a valid specifier was found, we need to retrieve the current status.
  var specifier  = m[1];
  var parameter = Number(m[2]);

  return this.status().then((status) => {
    // Determine the currently set temperature, according to the active user mode.
    var curSetpoint = Number(status[ status['user mode'] === 'manual' ? 'temp manual setpoint' : 'temp setpoint' ]);
    var curTemp = Number(status['in house temp']);

    // Let the specifier function determine a new temperature.
    var val = SPECIFIERS[specifier](curSetpoint, curTemp, parameter);
    return { newSetpoint: val, previousSetpoint: curSetpoint, currentTemperature: curTemp};
  });
}
