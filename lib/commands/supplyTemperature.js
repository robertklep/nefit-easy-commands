module.exports = function supplyTemperature() {
  return this.get('/heatingCircuits/hc1/actualSupplyTemperature').then((r) => {
    return { temperature : r.value, unit : r.unitOfMeasure };
  });
};
