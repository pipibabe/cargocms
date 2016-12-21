import React, { PropTypes } from 'react';
import FlatButton from 'material-ui/FlatButton';

const styles = {
  newOrder: {
    backgroundColor: '#4990E2',
    color: '#fff',
  },
  shipped: {
    backgroundColor: '#F9F9F9',
    color: '#000',
  },
  preparing: {
    backgroundColor: '#F6A623',
    color: '#fff',
  },
};
export default class ShipCardBody extends React.Component {
  static defaultProps = {
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
  };

  static propTypes = {
    isExpend: PropTypes.bool,
    invoiceNum: PropTypes.string,
    orderDetail: PropTypes.array,
    orderDate: PropTypes.object,
    orderSupplier: PropTypes.object,
    total: PropTypes.number,
    status: PropTypes.string,
  };

  constructor(props, context) {
    super(props, context);
  }

  handleBtnShipping = (event) => {
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
    alert('finish shipping!');
  }

  handleBtnPrint = (event) => {
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
    alert('print!');
  }

  render() {
    let stateColor = {};
    switch (this.props.status) {
      case '新訂單':
        stateColor = styles.newOrder;
        break;
      case '已出貨':
        stateColor = styles.shipped;
        break;
      case '備貨中':
        stateColor = styles.preparing;
        break;
      default:
        stateColor = styles.newOrder;
    }
    const expendedCardBody = (
      <div className='cardbody-expened'>
        <div className='order-invoice-expened'>
          <div className='title'>
            {this.props.invoiceNum}
          </div>
          <div className='sub-title'>
            建立於 {this.props.orderDate.createdAt}
          </div>
          <div className='sub-title'>
            更新於 {this.props.orderDate.updatedAt}
          </div>
        </div>
        <div className='order-content'>
          <div className='main-title'>
            <FlatButton
              ref={(c) => { this.btnShipping = c; }}
              className='btn-shipping'
              label='完成配送'
              onClick={this.handleBtnShipping}
            />
            <FlatButton
              ref={(c) => { this.btnPrint = c; }}
              className='btn-print'
              label='列印出貨單'
              onClick={this.handleBtnPrint}
            />
          </div>
        </div>
      </div>
    );

    const normalCardBody = (
      <div className='cardbody'>
        <div className='order-invoice'>
          <div className='title'>
            {this.props.invoiceNum}
          </div>
          <div className='sub-title'>
            更新於 {this.props.orderDate.updatedAt}
          </div>
        </div>
        <div className='order-content'>
          <div className='title'>
            {this.props.orderSupplier.name} {this.props.orderSupplier.telephone}
          </div>
          <div className='sub-title'>
            {
              this.props.orderDetail.map(item => (
                `${item.name}(${item.quantity}),`
              ))
            }
          </div>
        </div>
        <div className='order-price'>
          <div className='main-title'>
            ${this.props.total}
          </div>
        </div>
        <div
          className='order-status'
          style={stateColor}
        >
          <div className='main-title'>
            {this.props.status}
          </div>
        </div>
      </div>
    );
    return this.props.isExpend ? expendedCardBody : normalCardBody;
  }
}
