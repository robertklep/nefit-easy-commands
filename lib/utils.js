module.exports = {
  parseBoolean(value) {
    return value === 'on' ? true : value === 'off' ? false : null;
  },

  parseProgramData(data) {
    return data.filter((point) => point.active === 'on').map((point) => {
      var hour   = (point.t / 60) | 0;
      var minute = point.t % 60;
      return {
        dow  : [ 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa' ].indexOf(point.d),
        time : ('00' + hour).slice(-2) + ':' + ('00' + minute).slice(-2),
        temp : point.T
      };
    })
  }
};
