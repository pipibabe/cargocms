import React, { PropTypes } from 'react';
import ShipCardStepper from './ShipCardStepper';

const defaultProps = {
  toast: null,
  isExpend: false,
  invoiceNum: 'S1111222233334444',
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
  invoiceNum: PropTypes.string,
  orderDetail: PropTypes.array,
  orderDate: PropTypes.object,
  orderSupplier: PropTypes.object,
  total: PropTypes.number,
  status: PropTypes.string,
  //
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
        <div className='col-xs-4 text-left'>
          <span className='title'>{props.orderSupplier.name}</span>
          <p />
          <span className='title-label'>電話</span><br />
          <span className='sub-title'>{props.orderSupplier.telephone}</span>
          <p />

          <span className='title-label'>寄送方式</span><br />
          <span className='sub-title'>{props.shippingMethod}</span>
          <p />

          <span className='title-label'>付款方式</span><br />
          <span className='sub-title'>{props.paymentMethod}</span>
          <p />

          <span className='title-label'>收件地址</span><br />
          <span className='sub-title'>{props.shippingAddress}</span>
          <p />
        </div>
        <div className='col-xs-8 text-left'>
          <span className='title text-left'>出貨明細</span>
          <p />
          <div className='item-list-wrapper'>
            {
              props.orderDetail.map((item, i) => (
                <div className='row item-list' key={i}>
                  <div className='item col-xs-4 text-left'>{item.name}</div>
                  <div className='item col-xs-2 text-right'>x</div>
                  <div className='item col-xs-3 text-left'>{item.quantity} 盒</div>
                  <div className='item col-xs-3 text-left'>${item.price}</div>
                </div>
              ))
            }
          </div>
          <div className='price-wrapper text-left'>
            <span className='title-label'>總計</span>
            <br />
            <span className='price'>＄{props.total}</span>
            <p />
          </div>
        </div>
      </div>
      <ShipCardStepper />
    </div>
  );
}

ShipCardDetail.defaultProps = defaultProps;
ShipCardDetail.propTypes = propTypes;

export default ShipCardDetail;
