module.exports = {
  attributes: {
    name: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
    sequence: {
      type: Sequelize.INTEGER
    },
    feelings: {
      type: Sequelize.TEXT,
      set: function (val) {
        if (val) {
          this.setDataValue('feelings', JSON.stringify(val));
        }
        else {
          this.setDataValue('feelings', "[]");
        }
      },
      get: function () {
        try {
          var feelings = this.getDataValue('feelings');
          if (feelings) {
            return JSON.parse(feelings);
          }
          else {
            return [];
          }
        }
        catch (e) {
          console.log(e);
          return [];
        }
      }
    },
  },
  associations: function() {
    Scent.belongsTo(ScentNote);
    // Scent.hasMany(Feeling, {
    //   foreignKey: {
    //     name: 'ScentId'
    //   }
    // });
  },
  options: {
    timestamps: false,
    classMethods: {

      /**
       * 查詢所有香味分子
       */
      findAllWithRelation: async function() {
        return await Scent.findAll({
          include: [
            ScentNote
          ],
          order: 'sequence ASC',
        });
      },

      formatForApp: async function({scents}) {

        let result = scents.map((scent) => {
          let {id, name, sequence, feelings} = scent
          let color = ""
          let scentNote = ""
          if (scent.ScentNote) {
            scentNote = scent.ScentNote.toJSON();
            color = scent.ScentNote.color;
          }

          // let feelings = scent.Feelings.map((feeling) => {
          //   let {id, title} = feeling;
          //   return {id, title}
          // });

          return {id, sequence, name, color, feelings, scentNote}
        });

        return result
      },

      findAllWithRelationFormatForApp: async function(){
        let scents = await Scent.findAllWithRelation();
        let result = await Scent.formatForApp({scents});
        return result;
      }

    },
    instanceMethods: {},
    hooks: {}
  }
};
