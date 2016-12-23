import axios from 'axios';
import React, { PropTypes } from 'react';
import {
  FontIcon,
  Snackbar,
  AutoComplete,
} from 'material-ui';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
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
  cardListContainer: {
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
      dataSource: [],
      snackbarOpen: false,
      snackbarMsg: '',
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
      // console.log(error);
      this.handleSnackbarMessage(error);
    });
  }

  handleSnackbarMessage = (msg) => {
    this.setState({
      snackbarOpen: true,
      snackbarMsg: msg,
    });
  }

  handleSnackbarClose = () => {
    this.setState({
      snackbarOpen: false,
    });
  }

  render() {
    const dataSource = this.state.dataSource;
    let autoCompleteTitle = [];
    if (typeof dataSource.data === 'object') {
      autoCompleteTitle =
        dataSource.data.items.map(item => item);
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
                  toast={this.handleSnackbarMessage}
                  key={item.id}
                  {...item}
                />
              )) : null
            }
          </ReactCSSTransitionGroup>
        </div>
        <Snackbar
          open={this.state.snackbarOpen}
          message={this.state.snackbarMsg}
          autoHideDuration={4000}
          onRequestClose={this.handleSnackbarClose}
        />
      </div>
    );
  }

}
