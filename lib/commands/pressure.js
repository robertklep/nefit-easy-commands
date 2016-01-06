module.exports = function pressure() {
  return this.get('/system/appliance/systemPressure').then((r) => {
    return { pressure : r.value, unit : r.unitOfMeasure };
  });
};
