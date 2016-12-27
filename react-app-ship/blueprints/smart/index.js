module.exports = {
  description() {
    return 'generates a smart (container) component';
  },

  fileMapTokens() {
    return {
      __smart__: options => options.settings.getSetting('smartPath'),
    };
  },
};
