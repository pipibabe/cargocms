/* @flow */
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Drawer,
  MenuItem,
  Divider,
} from 'material-ui';
// import classes from './DrawerMenuItems.scss';

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
        <MenuItem>出貨總管</MenuItem>
        <MenuItem>未出貨</MenuItem>
        <MenuItem>已出貨</MenuItem>
        <MenuItem>顯示所有紀錄</MenuItem>
        <Divider />
        <MenuItem>我的帳號</MenuItem>
        <MenuItem>聯繫雲端漁場</MenuItem>
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
