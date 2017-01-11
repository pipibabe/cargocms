module.exports = {
    // index: function(req, res) {
    index: async (req, res) => {
        // println 'Hi Pipi!';
        try {
            const customers = await Customer.findAndCountAll();
            console.log( 'Hi Pipi!' );
            return res.ok({
                data: customers.rows,
                total: customers.count
            });
        }catch (e) {
          res.serverError(e);
        }
    },

    show: async (req, res) => {
      try {
        const {id} = req.params;
        const customer = await Customer.findById(id);
        return res.ok(customer);
      } catch (e) {
        res.serverError(e);
      }
    },

    create: async (req, res) => {
      try {
          sails.log.info(req.body);
        const customer =  await Customer.create(req.body);
        return res.ok({
            message:`create customer success.`,
            data: {},
        });
      } catch (e) {
        res.serverError(e);
      }
    },

    destroy: async (req, res) => {
      try {
        const {id} = req.params;
        await Customer.deleteById(id);
        return res.ok({
            message:`delete customer success.`,
            data: {},
        });
      } catch (e) {
        res.serverError(e);
      }
    },
};
