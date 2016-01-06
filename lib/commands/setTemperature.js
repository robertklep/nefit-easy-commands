module.exports = function setTemperatore(value) {
  var data = { value : Number(value) };
  return Promise.all([
    this.put('/heatingCircuits/hc1/temperatureRoomManual',          data),
    this.put('/heatingCircuits/hc1/manualTempOverride/status',      { value : 'on' }),
    this.put('/heatingCircuits/hc1/manualTempOverride/temperature', data),
  ]).then(() => {
    return { status : 'ok' };
  });
};
