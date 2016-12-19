/* @flow */
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {
  AppBar,
  Drawer,
} from 'material-ui';
import MainToolbar from './MainToolbar';
import DrawerMenuItems from './DrawerMenuItems';
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
  appBar: {
    backgroundColor: '#2D3743',
  },
  contentContainer: {
    // flex: 1,
    // display: 'flex',
    // flexDirection: 'row',
    // justifyContent: 'flex-start',
  },
  drawer: {
    position: 'fixed',
  },
  drawerContainer: {
    marginTop: 10,
    backgroundColor: '#F2F2F2',
    position: 'relative',
  },
  content: {
    paddingLeft: 10,
    position: 'relative',
  },
};

export default class AppDrawer extends React.Component {
  static propTypes = {
    content: PropTypes.object,
  };

  static defaultProps = {
    content: '',
  };

  constructor(props) {
    super(props);
    injectTapEventPlugin();
    this.state = {
      open: true,
      drawerWidth: 150,
    };
  }

  handleToggle = () => this.setState({
    open: !this.state.open,
  });

  render() {
    const drawerWidth = this.state.drawerWidth;
    const contentStyle = styles.content;
    if (this.state.open) {
      contentStyle.width = `calc(100% - ${drawerWidth})`;
      contentStyle.margin = `0px ${drawerWidth}px 0px ${drawerWidth}px`;
    } else {
      contentStyle.width = '80%';
      contentStyle.margin = '0 auto';
    }
    return (
      <div className=''>
        <AppBar
          title='雲端漁場出貨管理系統'
          iconClassNameRight='muidocs-icon-navigation-expand-more'
          onLeftIconButtonTouchTap={this.handleToggle}
          style={styles.appBar}
        >
          <MainToolbar />
        </AppBar>
        <div className='' style={styles.contentContainer}>
          <Drawer
            style={styles.drawer}
            containerStyle={styles.drawerContainer}
            className={classes.drawer}
            zDepth={0}
            open={this.state.open}
            width={this.state.drawerWidth}
            docked={true}
          >
            <DrawerMenuItems />
          </Drawer>
          <div className='text-center' style={contentStyle}>
            {this.props.content}
          </div>
        </div>
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
