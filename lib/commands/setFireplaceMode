module.exports = function setFireplaceMode(value) {
  return this.put('/ecus/rrc/userprogram/fireplacefunction', {value : (value ? 'on' : 'off')}).then(() => {
    return { status : 'ok' };
  });
};
