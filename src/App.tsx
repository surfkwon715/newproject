import React from 'react';
import { Route } from 'react-router';
import { ConnectedRouter } from "connected-react-router";
import { history } from "./redux/configureStore";

import Main from "./pages/Main";
import Favorties from './pages/Favorites';

//메인페이지와 즐겨찾기 페이지로 이동가능하도록 구성 
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
