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
    fontSize: 12,
  },
  contentContainer: {
    // flex: 1,
    // display: 'flex',
    // flexDirection: 'row',
    // justifyContent: 'flex-start',
  },
  drawer: {
    zIndex: 2,
    position: 'fixed',
  },
  drawerContainer: {
    marginTop: 10,
    backgroundColor: '#F2F2F2',
    // position: 'relative',
  },
  content: {
    zIndex: 1,
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
      width: 0,
      height: 0,
    };
  }

  componentWillMount = () => {
    this.updateDimensions();
  }

  componentDidMount = () => {
    window.addEventListener('resize', this.updateDimensions);
  }

  componentWillUnmount = () => {
    window.removeEventListener('resize', this.updateDimensions);
  }

  updateDimensions = () => {
    const w = window;
    const d = document;
    const documentElement = d.documentElement;
    const body = d.getElementsByTagName('body')[0];
    const width = w.innerWidth || documentElement.clientWidth || body.clientWidth;
    const height = w.innerHeight || documentElement.clientHeight || body.clientHeight;
    this.setState({ width, height });
  }

  handleToggle = () => this.setState({
    open: !this.state.open,
  });

  render() {
    const isMobile = this.state.width < 768;
    const drawerWidth = this.state.drawerWidth;

    if (this.state.open && !isMobile) {
      styles.content.width = `calc(100% - ${drawerWidth}px)`;
      styles.content.margin = `0px ${drawerWidth}px 0px ${drawerWidth}px`;
    } else {
      styles.content.width = '95%';
      styles.content.margin = '0 auto';
    }
    const zDepth = isMobile ? 2 : 0;
    const titleText = isMobile ? '出貨管理系統' : '雲端漁場出貨管理系統';

    styles.drawerContainer.position = isMobile ? 'fixed' : 'relative';
    return (
      <div className=''>
        <AppBar
          title={titleText}
          onLeftIconButtonTouchTap={this.handleToggle}
          style={styles.appBar}
        >
          <MainToolbar />
        </AppBar>
        <div className='' style={styles.contentContainer}>
          <Drawer
            style={styles.drawer}
            containerStyle={styles.drawerContainer}
            className='drawer'
            zDepth={zDepth}
            open={this.state.open}
            width={this.state.drawerWidth}
            docked={!isMobile}
          >
            <DrawerMenuItems />
          </Drawer>
          <div className='' style={styles.content}>
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
