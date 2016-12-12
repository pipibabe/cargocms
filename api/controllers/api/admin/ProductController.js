module.exports = {
  find: async (req, res) => {
    try {
      const { query } = req;
      const { serverSidePaging } = req.query;
      // const query = req.body;
      console.log("query ==>", query);
      const modelName = req.options.controller.split("/").reverse()[0];
      let result;
      if (serverSidePaging) {
        const include = [
          ProductTag,
          ProductDescription,
          ProductImage,
          Image,
          {
            model: ProductOption,
            include: {
              model: Option,
              include:[ OptionDescription, {
                  model: OptionValue,
                  include: OptionValueDescription
                }
              ]
            }
          }, {
            model: ProductOptionValue,
            include: [
              {
                model: Option,
                include: OptionDescription
              }, {
                model : OptionValue,
                include: OptionValueDescription
              }
            ]
          }
        ];
        result = await PagingService.process({ query, modelName, include });
      } else {
        const items = await sails.models[modelName].findAll({
          include:[
            ProductTag,
            ProductDescription,
            ProductImage,
            Image,
            {
              model: ProductOption,
              include: {
                model: Option,
                include:[ OptionDescription, {
                    model: OptionValue,
                    include: OptionValueDescription
                  }
                ]
              }
            }, {
              model: ProductOptionValue,
              include: [
                {
                  model: Option,
                  include: OptionDescription
                }, {
                  model : OptionValue,
                  include: OptionValueDescription
                }
              ]
            }
          ]
        });
        result = { data: { items } };
      }
      res.ok(result);
    } catch (e) {
      res.serverError(e);
    }
  },
}
