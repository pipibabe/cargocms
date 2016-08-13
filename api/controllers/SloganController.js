module.exports = {
  create: async (req, res) => {
    const data = req.body;
    try{
      sails.log.info('create slogan controller =>', data);
      const slogan = await Slogan.create(data);
      res.ok({
        message: 'Created Slogan success.',
        data: slogan,
      });
    }
    catch(e){
      res.serverError({ message: e.message, data: {}});
    }
  },

  find: async (req, res) => {
    try{
      const slogans = await Slogan.findAll();
      sails.log.info('find all slogan =>', slogans);
      res.ok({
        message: 'find all slogan success',
        data: {
         items: slogans
        }
      })
    }
    catch(e){
      res.serverError({ message: e.message, data: {}});
    }
  },

  findOne: async (req, res) => {
    try{
      const id = req.params.id;
      const slogan = await Slogan.findById(id);
      sails.log.info('find one slogan =>', slogan);
      res.ok({
        message: 'Get one slogan success.',
        data: slogan
      });
    }
    catch(e){
      res.serverError({ message: e.message, data: {}});
    }
  },

  update: async (req, res) => {
    try{
      const id = req.params.id;
      const newData = req.body;

      sails.log.info('update slogan controller id =>', id);
      sails.log.info('update slogan controller data =>', newData);
      const slogan = await Slogan.findById(id);
      slogan.content = newData.content;
      slogan.source  = newData.source;
      await slogan.save();

      res.ok({
        message: 'Update slogan success.',
        data: slogan
      });
    }
    catch(e){
      res.serverError({ message: e.message, data: {}});
    }
  },

  destroy: async (req, res) => {
    const id = req.params.id;
    try{
      sails.log.info('delete slogan controller =>',id);
      const slogan = await Slogan.destroy({where:{ id: id}});

      res.ok({
        message: 'Delete slogan success.',
        data: slogan
      });
    }
    catch(e){
      res.serverError({ message: e.message, data: {}});
    }
  }
}