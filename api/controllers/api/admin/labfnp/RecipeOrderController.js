
module.exports = {

  updateProductionStatus: async (req, res) => {
    try {
      const { id } = req.params;
      const { productionStatus } = req.body;
      const recipeOrder = await RecipeOrder.update({ productionStatus }, {
        where: { id }
      });
      const message = '訂單狀態更新成功'
      res.ok({ message });
    } catch (e) {
      res.serverError(e);
    }
  },
}
