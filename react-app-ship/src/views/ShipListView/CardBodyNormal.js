import React, { PropTypes } from 'react';
import CardStateColor from './CardStateColor';

const defaultProps = {
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
};

const propTypes = {
  invoiceNum: PropTypes.string,
  orderDetail: PropTypes.array,
  orderDate: PropTypes.object,
  orderSupplier: PropTypes.object,
  total: PropTypes.number,
  status: PropTypes.string,
};

function CardBodyNormal(props) {
  let stateColor = {};
  switch (props.status) {
    case '新訂單':
      stateColor = CardStateColor.newOrder;
      break;
    case '已出貨':
      stateColor = CardStateColor.shipped;
      break;
    case '備貨中':
      stateColor = CardStateColor.preparing;
      break;
    default:
      stateColor = CardStateColor.newOrder;
  }
  return (
    <div className='cardbody'>
      <div className='order-invoice'>
        <div className='title'>
          {props.invoiceNum}
        </div>
        <div className='sub-title'>
          更新於 {props.orderDate.updatedAt}
        </div>
      </div>
      <div className='order-content'>
        <div className='title'>
          {props.orderSupplier.name} {props.orderSupplier.telephone}
        </div>
        <div className='sub-title'>
          {
            props.orderDetail.map(item => (
              `${item.name}(${item.quantity}),`
            ))
          }
        </div>
      </div>
      <div className='order-price'>
        <div className='main-title'>
          ${props.total}
        </div>
      </div>
      <div
        className='order-status'
        style={stateColor}
      >
        <div className='main-title'>
          {props.status}
        </div>
      </div>
    </div>
  );
}

CardBodyNormal.defaultProps = defaultProps;
CardBodyNormal.propTypes = propTypes;

export default CardBodyNormal;
