import React, { PropTypes } from 'react';
import ShipCardStepper from './ShipCardStepper';

const defaultProps = {
  toast: null,
  isExpend: false,
  invoiceCode: 'S1111222233334444',
  orderDetail: [
    {
      id: 3,
      name: '鮮甜飽滿無毒益菌蝦',
      model: '鮮甜飽滿無毒益菌蝦',
      quantity: 22,
      price: 599,
      total: 13178,
      tax: 658.9,
      status: 'NEW',
      OrderProductId: 1,
      SupplierShipOrderId: 3,
    },
  ],
  orderDate: {
    createdAt: '2016/12/12',
    updatedAt: '2016/12/12',
  },
  orderSupplier: {
    id: 1,
    name: '壹陸捌活海產',
    email: '168_seafood@gmail.com',
    telephone: '(04)-2201-1688',
    fax: '(04)-2201-1168',
    address: '台中市清水區北提路',
  },
  total: '9912',
  status: '確定訂單',
  //
  telephone: '0987654321',
  paymentMethod: 'ATM',
  shippingName: '潘子',
  shippingAddress: '403 taichung 台灣城市的某個街道隨機號',
  shippingMethod: '郵局遞送',
  tracking: '確認訂單',
  comment: 'no comment',
};

const propTypes = {
  toast: PropTypes.func,
  isExpend: PropTypes.bool,
  invoiceCode: PropTypes.string,
  orderDetail: PropTypes.array,
  orderDate: PropTypes.object,
  orderSupplier: PropTypes.object,
  total: PropTypes.number,
  status: PropTypes.string,
  //
  telephone: PropTypes.string,
  paymentMethod: PropTypes.string,
  shippingName: PropTypes.string,
  shippingAddress: PropTypes.string,
  shippingMethod: PropTypes.string,
  tracking: PropTypes.string,
  comment: PropTypes.string,
};

function ShipCardDetail(props) {
  return (
    <div className='card-deatil'>
      <div className='row'>

        <div className='col-xs-12 row'>
          <div className='col-xs-6'>
            <span className='title'>客戶資料</span>
            <p />
            <table className='table'>
              <tr>
                <th>發票號碼</th>
                <td>{props.invoiceCode}</td>
              </tr>
              <tr>
                <th>收件姓名</th>
                <td>{props.shippingName}</td>
              </tr>
              <tr>
                <th>電話</th>
                <td>{props.telephone}</td>
              </tr>
              <tr>
                <th>寄送方式</th>
                <td>{props.shippingMethod}</td>
              </tr>
              <tr>
                <th>付款方式</th>
                <td>{props.paymentMethod}</td>
              </tr>
              <tr>
                <th>收件地址</th>
                <td>{props.shippingAddress}</td>
              </tr>
              <tr>
                <th>備註</th>
                <td>{props.comment}</td>
              </tr>
            </table>
          </div>
          <div className='col-xs-6'>
            <span className='title'>{props.orderSupplier.name}</span>
            <p />
            <table  className='table'>
              <tr>
                <th>聯絡電話</th>
                <td>{props.orderSupplier.telephone}</td>
              </tr>
              <tr>
                <th>傳真</th>
                <td>{props.orderSupplier.fax}</td>
              </tr>
              <tr>
                <th>電子郵件</th>
                <td>{props.orderSupplier.email}</td>
              </tr>
              <tr>
                <th>地址</th>
                <td>{props.orderSupplier.address}</td>
              </tr>
              <tr>
                <th>統一編號</th>
                <td></td>
              </tr>
            </table>
          </div>
        </div>

        <div className='col-xs-12'>
          <p/>
          <h2 className='title text-center'>出貨明細</h2>
        </div>
        <div className='col-xs-12'>
          <hr />
        </div>

        <div className='col-xs-12 item-list-wrapper'>
          <table className='table' width='100%'>
            <thead>
              <tr>
                <th>產品名稱</th>
                <th>數量</th>
                <th>單價</th>
                <th>小計</th>
              </tr>
            </thead>
            <tfoot>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td>總計：{props.total}</td>
              </tr>
            </tfoot>
            <tbody>
              {
                props.orderDetail.map((item, i) => (
                  <tr key={i}>
                    <td>{item.name}</td>
                    <td>{item.quantity} 盒</td>
                    <td>{item.price}</td>
                    <td>{item.price * item.quantity}</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>

      </div>
      <ShipCardStepper />
    </div>
  );
}

ShipCardDetail.defaultProps = defaultProps;
ShipCardDetail.propTypes = propTypes;

export default ShipCardDetail;
