import React, {useState, useEffect} from 'react';
import { Route } from 'react-router';
import {BrowserRouter} from "react-router-dom";

import Main from "./pages/Main";



function App() {
  return (
    <React.Fragment>
 
      <BrowserRouter>
    
        <Route path="/" exact component={Main} />
      </BrowserRouter>
  
  </React.Fragment>
  );
}

export default App;
