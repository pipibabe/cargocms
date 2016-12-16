/* @flow */
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import {
  AppBar,
  Drawer,
  MenuItem,
  RaisedButton,
} from 'material-ui'
import { increment, doubleAsync } from '../../redux/modules/counter'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { deepOrange500 } from 'material-ui/styles/colors'

export class HomeView extends React.Component {
  static propTypes = {
    counter: PropTypes.number.isRequired,
    doubleAsync: PropTypes.func.isRequired,
    increment: PropTypes.func.isRequired
  };
  props: Props;

  render() {
    const muiTheme = getMuiTheme({
      palette: {
        accent1Color: deepOrange500,
      },
    });
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div className='container text-center'>
          <AppBar
            title='Title'
            iconClassNameRight='muidocs-icon-navigation-expand-more'
          />
          <Drawer open={this.state.open}>
            <MenuItem>Menu Item</MenuItem>
            <MenuItem>Menu Item 2</MenuItem>
          </Drawer>
          <RaisedButton
            label='Toggle Drawer'
            onTouchTap={this.handleToggle}
          />
        </div>
      </MuiThemeProvider>
    )
  }
}


type Props = {
  counter: number,
  doubleAsync: Function,
  increment: Function
};

const mapStateToProps = (state) => ({
  counter: state.counter
})
export default connect(mapStateToProps, {
  increment: () => increment(1),
  doubleAsync
})(HomeView)
