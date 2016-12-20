import React, { PropTypes } from 'react';
import {
  Card,
  CardActions,
  CardHeader,
  CardText,
} from 'material-ui/Card';
import AutoComplete from 'material-ui/AutoComplete';
import FontIcon from 'material-ui/FontIcon';
import { FlatButton } from 'material-ui';
// import ShipCard from './ShipCard';

const styles = {
  iconSearch: {
    height: '72px',
    lineHeight: '72px',
    marginRight: 5,
    paddingTop: 10,
    right: '-70%',
    fontSize: 14,
  },
  iconContainer: {
    marginRight: 40,
    height: 72,
    verticalAlign: 'middle',
    lineHeight: '72px',
    fontSize: 0,
  },
  listContainer: {

  },
};

export default class ShipList extends React.Component {
  static defaultProps = {
    data: [],
  };

  static propTypes = {
    data: React.PropTypes.array,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      dataSource: [],
    };
  }

  handleUpdateInput = (value) => {
    this.setState({
      dataSource: [
        value,
        value + value,
        value + value + value,
      ],
    });
  };

  render() {
    const fruit = [
      'Apple', 'Apricot', 'Avocado',
      'Banana', 'Bilberry', 'Blackberry', 'Blackcurrant', 'Blueberry',
      'Boysenberry', 'Blood Orange',
      'Cantaloupe', 'Currant', 'Cherry', 'Cherimoya', 'Cloudberry',
      'Coconut', 'Cranberry', 'Clementine',
      'Damson', 'Date', 'Dragonfruit', 'Durian',
      'Elderberry',
      'Feijoa', 'Fig',
    ];

    return (
      <div className='container text-center' >
        <div className='row' style={styles.iconContainer}>
          <div className='col-xs-1'>
            <FontIcon
              className='material-icons'
              style={styles.iconSearch}
            >search</FontIcon>
          </div>
          <div className='col-xs-10'>
            <AutoComplete
              floatingLabelText='輸入關鍵字搜尋出貨記錄'
              filter={AutoComplete.fuzzyFilter}
              dataSource={fruit}
              maxSearchResults={5}
              // hintText='輸入以查詢'
              fullWidth={true}
            />
            <div className='col-xs-1'></div>
          </div>
        </div>
        <div className='row' style={styles.listContainer}>

        </div>
      </div>
    );
  }

}
