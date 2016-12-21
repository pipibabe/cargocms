import axios from 'axios';
import React, { PropTypes } from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import FontIcon from 'material-ui/FontIcon';
import { FlatButton } from 'material-ui';
import ShipCard from './ShipCard';
import classes from './_style.scss'

const styles = {
  iconSearch: {
    height: '72px',
    lineHeight: '72px',
    marginRight: 5,
    paddingTop: 10,
    right: '-70%',
    fontSize: 14,
  },
  searchBarContainer: {
    marginRight: 40,
    height: 72,
    verticalAlign: 'middle',
    lineHeight: '72px',
    fontSize: 0,
  },
  listContainer: {
    width: '90%',
    margin: '0 auto',
  },
};

export default class ShipList extends React.Component {
  static defaultProps = {
    data: {},
  };

  static propTypes = {
    data: PropTypes.object,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      dataSource: {},
    };
    this.handelGetJsonFromServer();
  }

  handelGetJsonFromServer = () => {
    const api = '/api/admin/suppliershiporder/all';
    axios.post(api)
    .then((response) => {
      console.log(`response=>${JSON.stringify(response.data)}`);
      this.setState({
        dataSource: response.data,
      });
    })
    .catch((error) => {
      console.log(error);
    });
  }

  render() {
    const items = this.state.dataSource.data.items;
    const autoCompleteTitle = [];
    for (const item of items) {
      autoCompleteTitle.push(item.displayName);
      autoCompleteTitle.push(item.invoicePrefix + item.invoiceNo);
      autoCompleteTitle.push(item.email);
      autoCompleteTitle.push(item.telephone);
      autoCompleteTitle.push(item.paymentAddress1);
      autoCompleteTitle.push(item.paymentCity);
    }

    console.log('classes=>'+JSON.stringify(classes));

    return (
      <div className='container' >
        <div className='row' style={styles.searchBarContainer}>
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
              dataSource={autoCompleteTitle}
              maxSearchResults={5}
              // hintText='輸入以查詢'
              fullWidth={true}
            />
            <div className='col-xs-1'>{}</div>
          </div>
        </div>
        <div className='row' style={styles.listContainer}>
          <div className='shipCardSeparater'>{}</div>
          {
            this.state.dataSource.data.items.map(item => (
              <ShipCard
                key={item.id}
                {...item}
              />
            ))
          }
        </div>
      </div>
    );
  }

}
