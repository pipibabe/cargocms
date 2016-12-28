/* @flow */
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
import '../_style.scss';
import {
  showToast,
  closeToast,
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

const searchTextBuffer = '';
const inputDelayer = null;

@connect(
  state => ({
    shipOrder: state.shipOrder,
    toast: state.toast,
  }),
  dispatch => bindActionCreators({
    showToast,
    closeToast,
    fetchShipListData,
    fetchFindShipItem,
  }, dispatch),
) export default class ShipList extends React.Component {
  static defaultProps = {
    shipOrder: {},
    showToast: null,
    closeToast: null,
    fetchShipListData: null,
    fetchFindShipItem: null,
  };

  static propTypes = {
    shipOrder: PropTypes.object,
    showToast: PropTypes.func,
    closeToast: PropTypes.func,
    fetchShipListData: PropTypes.func,
    fetchFindShipItem: PropTypes.func,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      dataSource: props.shipOrder.list,
    };
    this.inputDelayer = inputDelayer;
    this.searchTextBuffer = searchTextBuffer;
  }

  componentWillMount() {
    this.props.fetchShipListData();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.props !== nextProps || this.state !== nextState;
  }

  componentWillUpdate(nextProps) {
    if (nextProps !== this.props) {
      // check list data equal
      if (nextProps.shipOrder.list !== this.state.dataSource) {
        this.setState({
          dataSource: nextProps.shipOrder.list,
        });
      }
    }
  }

  handleUpdateInput = (searchText) => {
    const nil = Lang.isNil(searchText);
    const empty = Lang.isEmpty(searchText);
    if (nil || empty) {
      clearTimeout(this.inputDelayer);
      this.inputDelayer = null;
      this.props.fetchShipListData();
    }
  }

  handleSearchRequest = (chosenRequest: string, index: number) => {
    this.handleSearch(chosenRequest);
  }

  handleSearch = (searchText) => {
    if (!this.inputDelayer) {
      this.inputDelayer = setTimeout(() => {
        const nil = Lang.isNil(searchText);
        const empty = Lang.isEmpty(searchText);
        if (!nil && !empty) {
          this.props.fetchFindShipItem(searchText);
        } else {
          this.props.fetchShipListData();
        }
        clearTimeout(this.inputDelayer);
        this.inputDelayer = null;
      }, 300);
    }
  }

  render() {
    const dataSource = this.state.dataSource;
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
              onUpdateInput={this.handleUpdateInput}
              onNewRequest={this.handleSearchRequest}
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
