module.exports.init = async () => {
  try {
    const isDevMode = sails.config.environment === 'development';
    const isDropMode = sails.config.models.migrate == 'drop';

    if (isDevMode && isDropMode) {
      let quote = await Quote.create({
        content:'香水和每個人的氣味，都應該是具有獨特性並具有標誌性的，而唯有透過每個人感受與創造氣味，才能追尋出每個不同自我。',
        source:'LABORATORY OF FRAGRANCE & PERFUME',
        author:'LFP',
        type: 'quote',
      })
    }
  } catch (e) {
    console.error(e);
  }
};
