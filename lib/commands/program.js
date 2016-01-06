const utils = require('../utils');

module.exports = function program() {
  return Promise.props({
    active   : this.get('/ecus/rrc/userprogram/activeprogram').then((r) => r.value),
    program1 : this.get('/ecus/rrc/userprogram/program1').then((r) => utils.parseProgramData(r.value)),
    program2 : this.get('/ecus/rrc/userprogram/program2').then((r) => utils.parseProgramData(r.value)),
  });
};
