

/*
// Sample data
{
  notes: 'FLORAL',
  color: '',
  keywords: '',
  title: 'Fruity',
  title2: '果香調',
  description: ''
}
*/

module.exports = {
  attributes: {
    notes: {
      type: Sequelize.ENUM('FLORAL', 'ORIENTAL', 'WOODY', 'FRESH')
    },
    color: {
      type: Sequelize.STRING
    },
    keywords: {
      type: Sequelize.STRING
    },
    title: {
      type: Sequelize.STRING
    },
    title2: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    }
  },
  associations: function() {
    ScentNote.hasMany(Scent, {
      foreignKey: {
        name: 'ScentNoteId'
      }
    });
  },
  options: {
    timestamps: false,
    classMethods: {
      findAllWithRelation: async function(){
        let findScentNotes = await ScentNote.findAll({
          include: [{
            model: Scent
          }]
        });
        return findScentNotes;
      }
    },
    instanceMethods: {},
    hooks: {}
  }
};
