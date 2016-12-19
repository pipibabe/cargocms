module.exports.init = async () => {
  try {
    const isDevMode = sails.config.environment === 'development';
    const isDropMode = sails.config.models.migrate == 'drop';

    if (isDevMode && isDropMode) {
      const supplier = await Supplier.create({
        name: '壹陸捌活海產',
        email: '168_seafood@gmail.com',
        telephone: '(04)-2201-1688',
        fax: '(04)-2201-1168',
        address: '台中市清水區北提路'
      });
    }
  } catch (e) {
    console.error(e);
  }
};
