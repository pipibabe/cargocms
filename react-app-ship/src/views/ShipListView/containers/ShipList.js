import axios from 'axios';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  FontIcon,
  AutoComplete,
} from 'material-ui';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {
  showToast,
  closeToast,
} from '../../../redux/modules/toast';
import ShipCard from './ShipCard';
import classes from '../_style.scss';

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
    toast: state.toast,
  }),
  dispatch => bindActionCreators({
    showToast,
  }, dispatch),
) export default class ShipList extends React.Component {
  static defaultProps = {
    data: {},
    showToast: null,
  };

  static propTypes = {
    data: PropTypes.object,
    showToast: PropTypes.func,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      dataSource: [],
      showToast: props.showToast,
    };
    this.handelGetJsonFromServer();
  }

  handelGetJsonFromServer = () => {
    const api = '/api/admin/suppliershiporder/all';
    axios.post(api)
    .then((response) => {
      this.setState({
        dataSource: response.data,
      });
    })
    .catch((error) => {
      this.props.showToast('你是否尚未登入後台系統？ Error=>', error);
    });
  }

  render() {
    const dataSource = this.state.dataSource;
    const autoCompleteTitle = [];
    if (typeof dataSource.data === 'object') {
      for (const item of dataSource.data.items) {
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
              typeof dataSource.data === 'object' ? this.state.dataSource.data.items.map(item => (
                <ShipCard
                  toast={this.state.showToast}
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
