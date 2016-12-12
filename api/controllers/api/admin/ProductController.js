module.exports = {
  find: async (req, res) => {
    try {
      // const { query } = req;
      const { serverSidePaging } = req.query;
      const query = req.body;
      const modelName = req.options.controller.split("/").reverse()[0];
      let result;
      if (serverSidePaging) {
        const include = [
          {
            model: ProductTage
          }, {
            model: ProductDescription
          }, {
            model: ProductOption,
            include:[
              {
                model: Option
              }
            ]
          }, {
            model: ProductOptionValue,
            include:[
              {
                model: OptionValue,
                include:[
                  {
                    model: Option
                  }, {
                    model: OptionValueDescription
                  }
                ]
              }, {
                model: Option
              }, {
                model: ProductOption
              }
            ]
          }, {
            model: ProductImage
          }, {
            model: Image
          },
        ];
        result = await PagingService.process({ query, modelName, include });
      } else {
        const items = await sails.models[modelName].findAll({
          include:[
            {
              model: ProductTage
            }, {
              model: ProductDescription
            }, {
              model: ProductOption,
              include:[
                {
                  model: Option
                }
              ]
            }, {
              model: ProductOptionValue,
              include:[
                {
                  model: OptionValue,
                  include:[
                    {
                      model: Option
                    }, {
                      model: OptionValueDescription
                    }
                  ]
                }, {
                  model: Option
                }, {
                  model: ProductOption
                }
              ]
            }, {
              model: ProductImage
            }, {
              model: Image
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
