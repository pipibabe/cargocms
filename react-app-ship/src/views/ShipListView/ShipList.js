import React, { PropTypes } from 'react';
import {
  Card,
  CardActions,
  CardHeader,
  CardText,
} from 'material-ui/Card';
import { FlatButton } from 'material-ui';
import injectTapEventPlugin from 'react-tap-event-plugin';
import ShipCard from './ShipCard';

export default class ShipList extends React.Component {
  static defaultProps = {
    data: [

    ],
  };

  static propTypes = {
    data: PropTypes.array,
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
        {
          this.props.data.map(order => (
            <ShipCard
              onPress={() => this._handlePressBrewery(brewery) }
              brewery={brewery}
              key={brewery.name}
            />
          ))
        }
      </div>
    );
  }

}
