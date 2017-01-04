import React, { PropTypes } from 'react';
import CardStateColor from '../CardStateColor';

const defaultProps = {};

const propTypes = {
  shipOrderId: PropTypes.number,
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
    case 'NEW':
      stateColor = CardStateColor.newOrder;
      break;
    case 'SHIPPED':
      stateColor = CardStateColor.shipped;
      break;
    case 'PROCESSING':
      stateColor = CardStateColor.preparing;
      break;
    default:
      stateColor = CardStateColor.newOrder;
  }
  return (
    <div className='cardbody'>
      <div className='order-invoice'>
        <div className='title'>
          {props.shipOrderId}
          {props.invoiceCode.length > 1 ? (<span>({props.invoiceCode})</span>) : '' }
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
