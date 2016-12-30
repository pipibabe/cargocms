import React, { PropTypes } from 'react';
import CardStateColor from '../CardStateColor';

const defaultProps = {};

const propTypes = {
  invoiceCode: PropTypes.string,
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
          {props.invoiceCode}
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
