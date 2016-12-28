import React, { PropTypes } from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { deepOrange500 } from 'material-ui/styles/colors';
import AppDrawer from './AppDrawer';
import '../../styles/core.scss';
import './_style.scss';

// Note: Stateless/function components *will not* hot reload!
// react-transform *only* works on component classes.
//
// Since layouts rarely change, they are a good place to
// leverage React's new Stateless Functions:
// https://facebook.github.io/react/docs/reusable-components.html#stateless-functions
//
// CoreLayout is a pure function of its props, so we can
// define it with a plain javascript function...
function CoreLayout({ children }) {
  const muiTheme = getMuiTheme({
    palette: {
      accent1Color: deepOrange500,
    },
  });
  return (
    <MuiThemeProvider muiTheme={muiTheme}>
      <div className='page-container'>
        <div className='view-container'>
          <AppDrawer content={children} />
        </div>
      </div>
    </MuiThemeProvider>
  );
}

CoreLayout.propTypes = {
  children: PropTypes.element,
};

export default CoreLayout;
