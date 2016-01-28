const Promise = require('bluebird');

module.exports = function gasUsage(page) {
  var p = page ? Promise.resolve(page) : this.gasUsagePage();

  return p.then((page) => {
    return this.get('/ecus/rrc/recordings/gasusage?page=' + page);
  }).then((data) => {
    return data.value.filter((v) => v.T !== -1).map((v) => {
      var m = v.d.match(/^(\d{2})-(\d{2})-(\d{4})$/);
      return {
        date              : new Date(m[3], m[2] - 1, m[1]),
        'hot water'       : v.hw,
        'central heating' : v.ch,
        T                 : v.T,
      };
    });
  });
};

