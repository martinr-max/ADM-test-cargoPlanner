import React from 'react';
import { StylesProvider } from '@material-ui/core';
import Cargoplanner from './CargoPlanner/pages/CargoPlanner';
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import CompanyPage from './CargoPlanner/components/companyPage/CompanyPage';


function App() {
  
  return(
    <div>
      <StylesProvider injectFirst>
      <Router>
      <Redirect from='/planner/:id' to='/planner'/>
        <Switch>
          <Route path="/planner"  component={Cargoplanner}/>
          <Route path="/planner/:id" component={CompanyPage}/>
        </Switch> 
      </Router>
      </StylesProvider>
    </div>
  );  
}

export default App;
