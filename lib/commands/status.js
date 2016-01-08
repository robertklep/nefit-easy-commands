const Promise = require('bluebird');
const utils   = require('../utils');

module.exports = function status() {
  return Promise.all([
    this.get('/ecus/rrc/uiStatus'),
    this.get('/system/sensors/temperatures/outdoor_t1'),
  ]).spread((status, outdoor) => {
    var v = status.value;
    return {
      'user mode'                   : v.UMD,
      'clock program'               : v.CPM,
      'in house status'             : v.IHS,
      'in house temp'               : Number(v.IHT),
      'boiler indicator'            : { 'CH' : 'central heating', 'HW' : 'hot water', 'No' : 'off' }[v.BAI] || null,
      'control'                     : v.CTR,
      'temp override duration'      : Number(v.TOD),
      'current switchpoint'         : Number(v.CSP),
      'ps active'                   : utils.parseBoolean(v.ESI),
      'powersave mode'              : utils.parseBoolean(v.ESI),
      'fp active'                   : utils.parseBoolean(v.FPA),
      'fireplace mode'              : utils.parseBoolean(v.FPA),
      'temp override'               : utils.parseBoolean(v.TOR),
      'holiday mode'                : utils.parseBoolean(v.HMD),
      'boiler block'                : utils.parseBoolean(v.BBE),
      'boiler lock'                 : utils.parseBoolean(v.BLE),
      'boiler maintenance'          : utils.parseBoolean(v.BMR),
      'temp setpoint'               : Number(v.TSP),
      'temp override temp setpoint' : Number(v.TOT),
      'temp manual setpoint'        : Number(v.MMT),
      'hed enabled'                 : utils.parseBoolean(v.HED_EN),
      'hed device at home'          : utils.parseBoolean(v.HED_DEV),
      'outdoor temp'                : outdoor.value,
      'outdoor source type'         : outdoor.srcType,
    };
  });
};
