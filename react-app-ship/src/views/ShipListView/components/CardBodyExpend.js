import React, { PropTypes } from 'react';
import {
  FlatButton,
} from 'material-ui';

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
  handleBtnPrint: null,
  handleBtnShip: null,
};

const propTypes = {
  invoiceNum: PropTypes.string,
  orderDetail: PropTypes.array,
  orderDate: PropTypes.object,
  orderSupplier: PropTypes.object,
  total: PropTypes.number,
  status: PropTypes.string,
  handleBtnPrint: PropTypes.func,
  handleBtnShip: PropTypes.func,
};

function CardBodyExpend(props) {
  return (
    <div className='cardbody-expened'>
      <div className='order-invoice-expened'>
        <div className='title'>
          {props.invoiceNum}
        </div>
        <div className='sub-title'>
          建立於 {props.orderDate.createdAt}
        </div>
        <div className='sub-title'>
          更新於 {props.orderDate.updatedAt}
        </div>
      </div>
      <div className='order-content'>
        <div className='main-title'>
          <FlatButton
            className='btn-shipping'
            label='完成配送'
            onClick={props.handleBtnShip}
          />
          <FlatButton
            className='btn-print'
            label='列印出貨單'
            onClick={props.handleBtnPrint}
          />
        </div>
      </div>
    </div>
  );
}

CardBodyExpend.defaultProps = defaultProps;
CardBodyExpend.propTypes = propTypes;

export default CardBodyExpend;
