module.exports = function setHotWaterSupply(value) {
  return this.put('/dhwCircuits/dhwA/dhwOperationManualMode', { value : value }).then(() => {
    return { status : 'ok' };
  });
};
