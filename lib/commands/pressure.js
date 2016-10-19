module.exports = function pressure() {
  return this.get('/system/appliance/systemPressure').then((r) => {
    var minValue = r.minValue || 0;
    var maxValue = r.maxValue || 25;
    var pressure = r.value;

    // Invalid pressure?
    if (r.value < minValue || r.value > maxValue) {
      pressure = null;
    }

    return { pressure : r.value, unit : r.unitOfMeasure };
  });
};
