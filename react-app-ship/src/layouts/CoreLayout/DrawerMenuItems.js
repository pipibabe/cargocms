/* @flow */
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import {
  Drawer,
  MenuItem,
  Divider,
} from 'material-ui';
import classes from './_style.scss';

const styles = {
  drawer: {
    marginTop: 72,
    backgroundColor: '#F2F2F2',
  },
};

export default class DrawerMenuItems extends React.Component {
  static PropTypes = {

  };

  static defaultProps = {

  };

  constructor(props) {
    super(props);
    this.state = {
      open: true,
    };
  }

  render() {
    return (
      <div>
        <Link to={'/ship'}>
          <MenuItem >出貨總管</MenuItem>
        </Link>
        <Link to={'/HomeView'}>
          <MenuItem>未出貨</MenuItem>
        </Link>
        <Link to={'/ship'}>
          <MenuItem>已出貨</MenuItem>
        </Link>
        <Link to={'/ship/history'}>
          <MenuItem>顯示所有紀錄</MenuItem>
        </Link>
        <Link to={'/ship/user'}>
          <MenuItem>我的帳號</MenuItem>
        </Link>
        <Link to={'/contact'}>
          <MenuItem>聯繫雲端漁場</MenuItem>
        </Link>
      </div>
    );
  }
}

// const mapStateToProps = (state) => ({
//   counter: state.counter
// })
//
// export default connect(mapStateToProps, {
//   increment: () => increment(1),
//   doubleAsync
// })(DrawerMenuItems)
