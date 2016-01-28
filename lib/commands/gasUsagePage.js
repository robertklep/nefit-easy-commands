module.exports = function gasUsagePage(page) {
  return this.get('/ecus/rrc/recordings/gasusagePointer').then((pointer) => {
    // 32 entries per page.
    return Math.ceil(pointer.value / 32);
  });
};
