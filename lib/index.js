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

Object.assign(NefitEasyClient.prototype, {

  pressure() {
    return this.get('/system/appliance/systemPressure').then((r) => {
      return { pressure : r.value, unit : r.unitOfMeasure };
    });
  },

  status() {
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
        'fp active'                   : utils.parseBoolean(v.FPA),
        'temp override'               : utils.parseBoolean(v.TOR),
        'holiday mode'                : utils.parseBoolean(v.HMD),
        'boiler block'                : utils.parseBoolean(v.BBE),
        'boiler lock'                 : utils.parseBoolean(v.BLE),
        'boiler maintainance'         : utils.parseBoolean(v.BMR),
        'temp setpoint'               : Number(v.TSP),
        'temp override temp setpoint' : Number(v.TOT),
        'temp manual setpoint'        : Number(v.MMT),
        'hed enabled'                 : utils.parseBoolean(v.HED_EN),
        'hed device at home'          : utils.parseBoolean(v.HED_DEV),
        'outdoor temp'                : outdoor.value,
        'outdoor source type'         : outdoor.srcType,
      };
    });
  },

  location() {
    return Promise.props({
      lat : this.get('/system/location/latitude') .then((r) => Number(r.value)),
      lng : this.get('/system/location/longitude').then((r) => Number(r.value)),
    });
  },

  program() {
    return Promise.props({
      active   : this.get('/ecus/rrc/userprogram/activeprogram').then((r) => r.value),
      program1 : this.get('/ecus/rrc/userprogram/program1').then((r) => utils.parseProgramData(r.value)),
      program2 : this.get('/ecus/rrc/userprogram/program2').then((r) => utils.parseProgramData(r.value)),
    });
  },

  displayCode() {
    return this.get('/system/appliance/displaycode').then((r) => {
      return {
        code       : r.value,
        description: {
          '-H'  : 'central heating active',
          '=H'  : 'hot water active',
          '0C'  : 'system starting',
          '0L'  : 'system starting',
          '0U'  : 'system starting',
          '0E'  : 'system waiting',
          '0H'  : 'system standby',
          '0A'  : 'system waiting (boiler cannot transfer heat to central heating)',
          '0Y'  : 'system waiting (boiler cannot transfer heat to central heating)',
          '0E'  : 'system waiting (boiler cannot transfer heat to central heating)',
          '2E'  : 'boiler water pressure too low',
          'H07' : 'boiler water pressure too low',
          '2F'  : 'sensors measured abnormal temperature',
          '2L'  : 'sensors measured abnormal temperature',
          '2P'  : 'sensors measured abnormal temperature',
          '2U'  : 'sensors measured abnormal temperature',
          '4F'  : 'sensors measured abnormal temperature',
          '4L'  : 'sensors measured abnormal temperature',
          '6A'  : 'burner doesn\'t ignite',
          '6C'  : 'burner doesn\'t ignite',
          'rE'  : 'system restarting',
        }[r.value]
      };
    });
  },

  setTemperature(value) {
    var data = { value : Number(value) };
    return Promise.all([
      this.put('/heatingCircuits/hc1/temperatureRoomManual',          data),
      this.put('/heatingCircuits/hc1/manualTempOverride/status',      { value : 'on' }),
      this.put('/heatingCircuits/hc1/manualTempOverride/temperature', data),
    ]).then(() => {
      return { status : 'ok' };
    });
  }
});
