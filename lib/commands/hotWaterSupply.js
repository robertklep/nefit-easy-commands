module.exports = function hotWaterSupply() {
  return this.get('/dhwCircuits/dhwA/dhwOperationManualMode').then((r) => {;
    return { value : r.value };
  });
};
