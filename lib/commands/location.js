module.exports = function location() {
  return Promise.props({
    lat : this.get('/system/location/latitude') .then((r) => Number(r.value)),
    lng : this.get('/system/location/longitude').then((r) => Number(r.value)),
  });
};
