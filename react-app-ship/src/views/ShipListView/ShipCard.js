import React, { PropTypes } from 'react';
import {
  Card,
  CardText,
  CardHeader,
  CardActions,
} from 'material-ui/Card';
import ShipCardBody from './ShipCardBody';
import ShipCardDetail from './ShipCardDetail';

export default class ShipCard extends React.Component {
  static defaultProps = {
    toast: null,
    invoiceNo: 1111222233334444,
    invoicePrefix: 'S',
    displayName: '潘仔',
    createdDateTime: {
      dateTime: '2016/12/20 17:22',
      date: '2016/12/20',
      time: '17:22:00',
    },
    updatedDateTime: {
      dateTime: '2016/12/21 11:43',
      date: '2016/12/21',
      time: '11:43:00',
    },
    SupplierShipOrderDescriptions: [
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
    email: 'testOrder@example.com',
    paymentCompany: '',
    paymentAddress1: '台灣城市的某個街道隨機號',
    paymentAddress2: '',
    paymentCity: 'taichung',
    paymentPostcode: '402',
    paymentCountry: '',
    paymentCountryId: '0',
    paymentZone: '',
    paymentZoneId: '0',
    paymentAddressFormat: '',
    paymentCustomField: '',
    paymentMethod: 'ATM',
    paymentCode: '808080808080',
    shippingFirstname: '歐德',
    shippingLastname: '泰',
    shippingAddress1: '台灣城市的某個街道隨機號',
    shippingAddress2: '',
    shippingCity: 'taichung',
    shippingPostcode: '402',
    shippingCountry: '',
    shippingCountryId: '0',
    shippingZone: '',
    shippingZoneId: '0',
    shippingAddressFormat: '',
    shippingCustomField: '',
    shippingMethod: '郵局遞送',
    shippingCode: '123456789009876',
    comment: 'no comment',
    total: 123456,
    tracking: '確認訂單',
    status: '確定訂單',
    OrderId: 1,
    Supplier: {
      id: 1,
      name: '壹陸捌活海產',
      email: '168_seafood@gmail.com',
      telephone: '(04)-2201-1688',
      fax: '(04)-2201-1168',
      address: '台中市清水區北提路',
    },
  };

  static propTypes = {
    toast: PropTypes.func,
    invoiceNo: PropTypes.number,
    invoicePrefix: PropTypes.string,
    displayName: PropTypes.string,
    createdDateTime: PropTypes.object,
    updatedDateTime: PropTypes.object,
    SupplierShipOrderDescriptions: PropTypes.array,
    email: PropTypes.string,
    paymentCompany: PropTypes.string,
    paymentAddress1: PropTypes.string,
    paymentAddress2: PropTypes.string,
    paymentCity: PropTypes.string,
    paymentPostcode: PropTypes.string,
    paymentCountry: PropTypes.string,
    paymentCountryId: PropTypes.string,
    paymentZone: PropTypes.string,
    paymentZoneId: PropTypes.string,
    paymentAddressFormat: PropTypes.string,
    paymentCustomField: PropTypes.string,
    paymentMethod: PropTypes.string,
    paymentCode: PropTypes.string,
    shippingFirstname: PropTypes.string,
    shippingLastname: PropTypes.string,
    shippingAddress1: PropTypes.string,
    shippingAddress2: PropTypes.string,
    shippingCity: PropTypes.string,
    shippingPostcode: PropTypes.string,
    shippingCountry: PropTypes.string,
    shippingCountryId: PropTypes.string,
    shippingZone: PropTypes.string,
    shippingZoneId: PropTypes.string,
    shippingAddressFormat: PropTypes.string,
    shippingCustomField: PropTypes.string,
    shippingMethod: PropTypes.string,
    shippingCode: PropTypes.string,
    comment: PropTypes.string,
    total: PropTypes.number,
    tracking: PropTypes.string,
    status: PropTypes.string,
    OrderId: PropTypes.number,
    Supplier: PropTypes.object,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      open: false,
    };
  }

  handleCardExpend = () => {
    const openState = this.state.open;
    this.setState({ open: !openState });
  }

  render() {
    const cardBody = {
      isExpend: this.state.open,
      invoiceNum: this.props.invoicePrefix + this.props.invoiceNo,
      orderDetail: this.props.SupplierShipOrderDescriptions,
      orderSupplier: this.props.Supplier,
      ordrDate: {
        createdAt: this.props.createdDateTime.date,
        updatedAt: this.props.updatedDateTime.date,
      },
      total: this.props.total,
      status: this.props.status,
    };
    const cardDetail = {
      shippingName: this.props.shippingLastname + this.props.shippingFirstname,
      shippingAddress: `${this.props.shippingPostcode} ${this.props.shippingCity}${this.props.shippingAddress1}`,
      tracking: this.props.tracking,
      comment: this.props.comment,
    };
    return (
      <Card
        className='card'
        expanded={this.state.open}
        onClick={this.handleCardExpend}
      >
        <ShipCardBody
          // toast func
          toast={this.props.toast}
          isExpend={cardBody.isExpend}
          invoiceNum={cardBody.invoiceNum}
          orderDesc={cardBody.desc}
          orderDate={cardBody.ordrDate}
          total={cardBody.total}
          orderSupplier={cardBody.orderSupplier}
          status={cardBody.status}
        />
        <CardActions>{}</CardActions>
        <CardText expandable={true}>
          <ShipCardDetail
            // toast func
            toast={this.props.toast}
            // same as cardBody
            isExpend={cardBody.isExpend}
            invoiceNum={cardBody.invoiceNum}
            orderDesc={cardBody.desc}
            orderDate={cardBody.ordrDate}
            total={cardBody.total}
            orderSupplier={cardBody.orderSupplier}
            status={cardBody.status}
            // for CardDetail
            paymentMethod={cardDetail.paymentMethod}
            shippingName={cardDetail.shippingName}
            shippingAddress={cardDetail.shippingAddress}
            shippingMethod={cardDetail.shippingMethod}
            tracking={cardDetail.tracking}
            comment={cardDetail.comment}
          />
        </CardText>
      </Card>
    );
  }
}
