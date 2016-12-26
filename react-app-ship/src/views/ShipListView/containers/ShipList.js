/* @flow */
import axios from 'axios';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  FontIcon,
  AutoComplete,
} from 'material-ui';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Lang from 'lodash';
import ShipCard from './ShipCard';
import classes from '../_style.scss';
import {
  showToast,
} from '../../../redux/modules/toast';
import {
  fetchShipListData,
  fetchFindShipItem,
} from '../../../redux/modules/shipOrder';

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
  cardListContainer: {
    width: '90%',
    margin: '0 auto',
  },
};

@connect(
  state => ({
    shipOrder: state.shipOrder,
    toast: state.toast,
  }),
  dispatch => bindActionCreators({
    showToast,
    fetchShipListData,
    fetchFindShipItem,
  }, dispatch),
) export default class ShipList extends React.Component {
  static defaultProps = {
    shipOrder: {},
    showToast: null,
    fetchShipListData: null,
    fetchFindShipItem: null,
  };

  static propTypes = {
    shipOrder: PropTypes.object,
    showToast: PropTypes.func,
    fetchShipListData: PropTypes.func,
    fetchFindShipItem: PropTypes.func,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      searchText: '',
    };
  }

  componentWillMount() {
    this.props.fetchShipListData();
  }

  handleSearchText = (
    searchText: string,
    dataSource: Array,
    params: Object,
  ) => {
    console.log(`searchText=>${searchText}, params=>${params}`);
    this.setState({
      searchText,
    });
  }

  handleSearchRequest = (chosenRequest: string, index: number) => {
    console.log(`searchText=>${chosenRequest}, index=>${index}`);
    this.props.showToast(`正在搜尋${this.state.searchText}...`);
    this.props.fetchFindShipItem(this.state.searchText);
  }

  render() {
    console.log('searchText=>', this.state.searchText);
    const dataSource = this.props.shipOrder.list;
    console.log('dataSource=>', dataSource);
    const isNoData = Lang.isEmpty(dataSource);
    const autoCompleteTitle = [];
    if (!isNoData) {
      for (const item of dataSource.items) {
        autoCompleteTitle.push(item.displayName);
        autoCompleteTitle.push(item.invoicePrefix + item.invoiceNo);
        autoCompleteTitle.push(item.email);
        autoCompleteTitle.push(item.telephone);
        autoCompleteTitle.push(item.paymentAddress1);
        autoCompleteTitle.push(item.paymentCity);
      }
      if (Lang.isEmpty(dataSource.items)) {
        this.props.showToast('沒有資料');
      }
    }
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
              onUpdateInput={this.handleSearchText}
              onKeyDown={this.handleSearchRequest}
            />
            <div className='col-xs-1'>{}</div>
          </div>
        </div>
        <div className='row' style={styles.cardListContainer}>
          <div className='shipCardSeparater'>{}</div>
          <ReactCSSTransitionGroup
            transitionName='cardlist'
            transitionEnterTimeout={800}
            transitionLeaveTimeout={300}
          >
            {
              !isNoData ?
                dataSource.items.map(item => (
                  <ShipCard
                    toast={this.props.showToast}
                    key={item.id}
                    {...item}
                  />
                )) : null
            }
          </ReactCSSTransitionGroup>
        </div>
      </div>
    );
  }
}
