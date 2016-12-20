import React, { PropTypes } from 'react';
import {
  Card,
  CardText,
} from 'material-ui/Card';
import classes from './_style.scss'

const styles = {
  title: {
    width: '25%',
    height: '70px',
    float: 'left',
    padding: 10,
  },
  desc: {
    width: '50%',
    height: '70px',
    float: 'left',
    padding: 10,
    textAlign: 'left',
  },
  descTitle: {
    fontSize: '15px',
  },
  price: {
    width: '10%',
    height: '70px',
    float: 'left',
    padding: 10,
    textAlign: 'center',
    lineHeight: '50px',
  },
  status: {
    width: '15%',
    height: '70px',
    float: 'left',
    padding: 10,
    lineHeight: '50px',
  },
};

export default class ShipCard extends React.Component {
  static defaultProps = {
    orderNum: 'S1111222233334444',
    orderDate: '2015/12/12',
    title: '一六八活海產(04)-0000-0000',
    desc: '鮮甜飽滿無毒益菌蝦(3) + 巨無霸完美天使紅蟹(2)',
    price: '2,050',
    status: '新訂單',
    style: null,
  };

  static propTypes = {
    orderNum: PropTypes.string,
    orderDate: PropTypes.string,
    title: PropTypes.string,
    desc: PropTypes.string,
    price: PropTypes.string,
    status: PropTypes.string,
    style: PropTypes.object,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      open: false,
    };
  }

  render() {
    const { orderNum, orderDate, title, desc, price, status } = this.props;
    const { open } = this.state;
    return (
      <Card
        expanded={this.state.open}
        onClick={() => { this.setState({ open: !open }); }}
      >
        <div>
          <div style={styles.title}>
            <div>{orderNum}</div>
            <div>建立於 {orderDate}</div>
          </div>
          <div style={styles.desc}>
            <div style={styles.descTitle}>{title}</div>
            <div>{desc}</div>
          </div>
          <div style={styles.price}>
            <div>${price}</div>
          </div>
          <div style={styles.status}>
            <div>{status}</div>
          </div>
        </div>
        <CardText expandable={true}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
          Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
          Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
        </CardText>
      </Card>
    );
  }

}
