import React from 'react';
import { Route } from 'react-router';
import { ConnectedRouter } from "connected-react-router";
import { history } from "./redux/configureStore";

import Main from "./pages/Main";
import Favorties from './pages/Favorites';

function App() {
  return (
  <React.Fragment>
    <ConnectedRouter history={history}>
      <Route path="/" exact component={Main} />
      <Route path="/favorites" exact component={Favorties} />
    </ConnectedRouter>
  </React.Fragment>
  );
}

export default App;
