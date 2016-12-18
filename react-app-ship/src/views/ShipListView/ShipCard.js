import React, { PropTypes } from 'react';
import {
  Card,
  CardActions,
  CardHeader,
  CardText,
} from 'material-ui/Card';
import { FlatButton } from 'material-ui';
import injectTapEventPlugin from 'react-tap-event-plugin';

export default class ShipCard extends React.Component {
  static defaultProps = {
    id: 0,
    orderNum: 'S1111222233334444',
    orderDate: '2015/12/12',
    title: '一六八活海產(04)-0000-0000',
    desc: '鮮甜飽滿無毒益菌蝦(3) + 巨無霸完美天使紅蟹(2)',
    price: '$2,050',
    status: '新訂單',
  };

  static propTypes = {
    id: PropTypes.number.isRequired,
    orderNum: PropTypes.String.isRequired,
    orderDate: PropTypes.String.isRequired,
    title: PropTypes.String.isRequired,
    desc: PropTypes.String.isRequired,
    price: PropTypes.String.isRequired,
    status: PropTypes.String.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    injectTapEventPlugin();
    this.state = {
      open: false,
    };
  }

  render() {
    return (
      <div className='d' >
        <Card>
          <CardHeader
            title='Without Avatar'
            subtitle='Subtitle'
            actAsExpander={true}
            showExpandableButton={true}
          />
          <CardActions>
            <FlatButton label='Action2' />
          </CardActions>
          <CardText expandable={true}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
            Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
            Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
          </CardText>
        </Card>
        <FlatButton label='Action1' />
      </div>
    );
  }

}
