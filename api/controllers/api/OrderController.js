module.exports = {
  createOrder: async (req, res) => {
    try{
      let data = req.body;
      const loginUser = AuthService.getSessionUser(req);
      data.UserId = loginUser.id;

      if( data.firstname !== loginUser.firstName || data.lastname  !== loginUser.lastName){
        data.firstname = loginUser.firstName;
        data.lastname  = loginUser.lastName;
      }

      // some data can fetch from request
      data.userAgent = req.header["user-agent"] || '';
      data.ip = req.ip;
      // not sure which should record
      data.forwardedIp = req.headers["X-Real-IP"] || '';
      // data.forwardedIp = req.headers["X-Forwarded-For"] || '';
      data.acceptLanguage = req.header["accept-language"] || '';

      const { order , orderProduct } = await OrderService.createOrder(data);

      const message = 'Order create success';

      res.ok({
        message,
        data: {
          item: order,
          product: orderProduct
        },
      }, {
        redirect: `/orderinfo/${order.id}`,
      });
      // return res.redirect(`/orderinfo/${order.id}`);

    } catch (e) {
      res.serverError(e);
    }
  },

  getOrderInfo: async (req, res) => {
    try{
      const orderId = req.params.id;
      const order = await Order.findById(orderId,{ include: [ User , OrderStatus ]});
      const loginUser = AuthService.getSessionUser(req);
      let message = '';
      if(!order){
        return res.notFound();
      }

      if(!loginUser || loginUser.id !== order.UserId){
        message = '您沒有足夠權限瀏覽此網頁';
        return res.forbidden(message);
      }

      const orderProduct = await OrderProduct.findAll({
        where: {
          OrderId: order.id
        }
      })

      message = 'get Order info success';

      res.view('b2b/order/index',{
        message: message,
        data: {
          item: order,
          product: orderProduct,
        }
      });

    } catch(e) {
      res.serverError(e);
    }
  }
}
