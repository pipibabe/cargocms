/* @flow */
import React, { PropTypes } from 'react';
import {
  Toolbar,
  ToolbarGroup,
  ToolbarSeparator,
  ToolbarTitle,
} from 'material-ui/Toolbar';
import {
  IconMenu,
  IconButton,
  FontIcon,
  MenuItem,
} from 'material-ui';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import classes from './_style.scss';

const styles = {
  toolbar: {
    marginTop: 5,
    marginRight: -12,
    backgroundColor: '#2D3743',
    padding: 0,
  },
  white: {
    color: '#fff',
  },
  iconMenu: {
    right: 0,
  },
  title: {
    padding: 0,
    color: '#fff',
  },
};

export default class MainToolbar extends React.Component {
  static PropTypes = {

  };

  static defaultProps = {

  };

  constructor(props) {
    super(props);
    this.state = {
      value: 3,
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

  handleChange = (event, index, value) => this.setState(value);

  render() {
    const isMobile = this.state.width < 768;
    styles.title.display = !isMobile ? 'block' : 'none';
    return (
      <Toolbar style={styles.toolbar}>
        {/* <ToolbarSeparator style={styles.white} /> */}
        <ToolbarGroup firstChild={true}>
          <FontIcon className='material-icons' style={styles.white}>
            account_circle
          </FontIcon>
          <ToolbarTitle text='一尾鮮魚活海產' style={styles.title} />
          <IconMenu
            style={styles.iconMenu}
            iconButtonElement={
              <IconButton touch={true}>
                <NavigationExpandMoreIcon style={styles.white} />
              </IconButton>
            }
          >
            <MenuItem primaryText='Download' />
            <MenuItem primaryText='More Info' />
          </IconMenu>
        </ToolbarGroup>
      </Toolbar>
    );
  }
}
