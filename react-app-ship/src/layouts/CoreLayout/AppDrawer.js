/* @flow */
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {
  AppBar,
  Drawer,
  MenuItem,
  Divider,
} from 'material-ui';
import MainToolbar from './MainToolbar';
import classes from './AppDrawer.scss';

// import { increment, doubleAsync } from '../../redux/modules/counter';

// @connect(
//   state => ({
//     counter: state.counter,
//   }),
//   dispatch => bindActionCreators({
//   }, dispatch),
// )
const styles = {
  drawer: {
    marginTop: 72,
    backgroundColor: '#F2F2F2',
  },
  appBar: {
    backgroundColor: '#2D3743',
  },
};

export default class AppDrawer extends React.Component {
  static PropTypes = {

  };

  static defaultProps = {

  };

  constructor(props) {
    super(props);
    injectTapEventPlugin();
    this.state = {
      open: true,
    };
  }

  handleToggle = () => this.setState({
    open: !this.state.open,
  });

  render() {
    return (
      <div>
        <AppBar
          title='雲端漁場出貨管理系統'
          iconClassNameRight='muidocs-icon-navigation-expand-more'
          onLeftIconButtonTouchTap={this.handleToggle}
          style={styles.appBar}
        >
          <MainToolbar />
        </AppBar>
        <Drawer
          containerStyle={styles.drawer}
          className={classes.drawer}
          zDepth={0}
          open={this.state.open}
        >
          <MenuItem>出貨總管</MenuItem>
          <MenuItem>未出貨</MenuItem>
          <MenuItem>已出貨</MenuItem>
          <MenuItem>顯示所有紀錄</MenuItem>
          <Divider />
          <MenuItem>我的帳號</MenuItem>
          <MenuItem>聯繫雲端漁場</MenuItem>
        </Drawer>
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
// })(AppDrawer)
