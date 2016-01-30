module.exports = function setUserMode(value) {
  return this.put('/heatingCircuits/hc1/usermode', { value : value }).then(() => {
    return { status : 'ok' };
  });
};
