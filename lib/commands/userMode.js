module.exports = function userMode() {
  return this.get('/heatingCircuits/hc1/usermode').then((r) => {;
    return { value : r.value };
  });
};
