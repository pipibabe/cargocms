/* @flow */
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {
  AppBar,
  Drawer,
  Snackbar,
} from 'material-ui';
import MainToolbar from './MainToolbar';
import DrawerMenuItems from './DrawerMenuItems';
import {
  showToast,
  closeToast,
} from '../../redux/modules/toast';
import {
  fetchCurrentUserData,
} from '../../redux/modules/user';

const styles = {
  appBar: {
    fontSize: 12,
    backgroundColor: '#2D3743',
  },
  contentContainer: {
  },
  drawer: {
    paddingLeft: 15,
    zIndex: 1,
    position: 'fixed',
    width: 200,
  },
  drawerContainer: {
    marginTop: 10,
    backgroundColor: '#F2F2F2',
  },
  content: {
    zIndex: 1,
    paddingLeft: 10,
    position: 'relative',
  },
};

@connect(
  state => ({
    toast: state.toast,
    user: state.user,
  }),
  dispatch => bindActionCreators({
    showToast,
    closeToast,
    fetchCurrentUserData,
  }, dispatch),
) export default class AppDrawer extends React.Component {
  static propTypes = {
    fetchCurrentUserData: PropTypes.func,
    showToast: PropTypes.func,
    closeToast: PropTypes.func,
    toast: PropTypes.object,
    content: PropTypes.object,
  };

  static defaultProps = {
    fetchCurrentUserData: null,
    showToast: null,
    closeToast: null,
    toast: {},
    content: '',
  };

  constructor(props) {
    super(props);
    injectTapEventPlugin();
    props.fetchCurrentUserData();
    this.state = {
      drawerOpen: true,
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

  componentWillReceiveProps = (nextProps) => {}

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

  handleToggle = () => {
    this.props.showToast('你切換了 Drawer');
    this.setState({
      drawerOpen: !this.state.drawerOpen,
    });
  };

  render() {
    const isMobile = this.state.width < 768;
    const drawerWidth = this.state.drawerWidth;

    if (this.state.open || !isMobile) {
      styles.content.width = `calc(100% - ${drawerWidth}px)`;
      styles.content.margin = `0px ${drawerWidth}px 0px ${drawerWidth}px`;
      styles.drawer.zIndex = 1;
      styles.drawerContainer.paddingTop = 0;
    } else {
      styles.content.width = '95%';
      styles.content.margin = '0 auto';
      styles.drawer.zIndex = 2;
      styles.drawerContainer.paddingTop = 60;
    }
    const zDepth = isMobile ? 2 : 0;
    const titleText = isMobile ? '出貨管理系統' : '雲端漁場出貨管理系統';

    styles.drawerContainer.position = isMobile ? 'fixed' : 'relative';
    return (
      <div className=''>
        <AppBar
          className='appBar'
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
            className='drawerContainer'
            zDepth={zDepth}
            open={this.state.drawerOpen}
            width={this.state.drawerWidth}
            docked={!isMobile}
          >
            <DrawerMenuItems />
          </Drawer>
          <div className='' style={styles.content}>
            {this.props.content}
          </div>
          <Snackbar
            open={this.props.toast.open}
            message={this.props.toast.msg}
            autoHideDuration={4000}
            onRequestClose={this.props.closeToast}
          />
        </div>
      </div>
    );
  }
}
