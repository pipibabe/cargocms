import React from 'react';
import { Route, IndexRoute } from 'react-router';

// NOTE: here we're making use of the `resolve.root` configuration
// option in webpack, which allows us to specify import paths as if
// they were from the root of the ~/src directory. This makes it
// very easy to navigate to files regardless of how deeply nested
// your current file is.
import CoreLayout from 'layouts/CoreLayout/CoreLayout';
import HomeView from 'views/HomeView/HomeView';
import Login from 'views/Login/Login';
import MaterialUi from 'views/MaterialUi/MaterialUi';
import ShipList from 'views/ShipListView';

export default (store) => (
  <Route path='/'>
    <IndexRoute component={Login} />
    <Route path='/ship/login' component={Login} />
    <Route path='/ship' component={CoreLayout}>
      <IndexRoute component={ShipList} />
      <Route path='/ship/history' component={ShipList} />
      <Route path='/ship/user' component={ShipList} />
    </Route>
    <Route path='/contact' component={Login} />
    <Route path='/HomeView' component={CoreLayout}>
      <IndexRoute component={HomeView} />
    </Route>
  </Route>
);

//
// export default (store) => (
//   <Route path='/ship' component={CoreLayout}>
