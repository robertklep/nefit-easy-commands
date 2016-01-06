module.exports = function displayCode() {
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
};
