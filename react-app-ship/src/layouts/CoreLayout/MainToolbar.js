/* @flow */
import React, { PropTypes } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
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
import classes from './MainToolbar.scss';

const styles = {
  toolbar: {
    marginTop: 5,
    backgroundColor: '#2D3743',
  },
  white: {
    'color': '#fff',
  }
};

export default class MainToolbar extends React.Component {
  static PropTypes = {

  };

  static defaultProps = {

  };

  constructor(props) {
    super(props);
    // injectTapEventPlugin();
    this.state = {
      value: 3,
    };
  }

handleChange = (event, index, value) => this.setState(value);

  render() {
    return (
        <Toolbar style={styles.toolbar}>
          <ToolbarSeparator style={styles.white} />
          <ToolbarGroup firstChild={true}>
            <FontIcon
              style={styles.white}
              className='muidocs-icon-action-hom'
            />
            <ToolbarTitle text='一尾鮮魚活海產' style={styles.white} />
            <IconMenu
              iconButtonElement={
                <IconButton touch={true}>
                  <NavigationExpandMoreIcon style={styles.white} />
                </IconButton>
              }
            >
              <MenuItem primaryText="Download" />
              <MenuItem primaryText="More Info" />
            </IconMenu>
          </ToolbarGroup>
        </Toolbar>

    );
  }
}
