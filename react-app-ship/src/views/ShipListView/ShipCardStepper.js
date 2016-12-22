import React, { PropTypes } from 'react';
import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper';
import {
  blue400,
  orange400,
  grey300,
  grey900,
} from 'material-ui/styles/colors';
import FontIcon from 'material-ui/FontIcon';

function ShipCardStepper(props) {
  return (
    <div className='row stepper-wrapper'>
      <div className='col-xs-12 stepper-content'>
        <Stepper linear={false}>
          <Step completed={false}>
            <StepLabel
              className='step-dot step-new'
              icon={
                <FontIcon
                  className='material-icons'
                  style={{ color: blue400 }}
                >check_circle
                </FontIcon>}
            >
              新訂單
            </StepLabel>
          </Step>

          <Step completed={false}>
            <StepLabel
              className='step-dot step-preparing'
              icon={
                <FontIcon
                  className='material-icons'
                  style={{ color: orange400 }}
                >pause_circle_outline
                </FontIcon>}
            >
              備貨中
            </StepLabel>
          </Step>

          <Step completed={false}>
            <StepLabel
              className='step-dot step-shipped'
              icon={
                <FontIcon
                  className='material-icons'
                  style={{ color: grey300 }}
                >pause_circle_outline
                </FontIcon>}
            >
              已出貨
            </StepLabel>
          </Step>

          <Step completed={false}>
            <StepLabel
              className='step-dot step-finsih'
              icon={
                <FontIcon
                  className='material-icons'
                  style={{ color: grey900 }}
                >pause_circle_outline
                </FontIcon>}
            >
              完成配送
            </StepLabel>
          </Step>
        </Stepper>
      </div>
    </div>
  );
}

ShipCardStepper.defaultProps = {
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

ShipCardStepper.propTypes = {
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

export default ShipCardStepper;
