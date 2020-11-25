import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter, Route, Switch, Redirect,Router } from "react-router-dom";
import App from './App';
import * as serviceWorker from './serviceWorker';
import Intro from './Intro/Intro';
import Main from './Main/Main';
import Crop from './Main/Components/Crop';
import FarmerTransaction from './Main/Components/FarmerTransaction';
import CompanyTransaction from './Main/Components/CompanyTransaction';
import GovtTransaction from './Main/Components/GovtTransaction';
import CompanyDashboard from './Main/Dashboard/CompanyDashboard';
import SignInSide from './Main/Components/Register/SignInSide';
import SignUp from './Main/Components/Register/SignUp';
import GovtDashboard from './Main/Dashboard/GovtDashboard';

ReactDOM.render(
  <React.StrictMode>
     <BrowserRouter>
              <Switch>
                <Route path="/register" component={SignUp} />
                <Route path="/login" component={SignInSide} />
                <Route path="/govttransaction" component={GovtTransaction} />
                <Route path="/companytransaction" component={CompanyTransaction} />
                <Route path="/intro" component={Intro} />
                <Route path="/crop" component={Crop} />
                <Route path="/main" component={Main} />
                <Route path="/govtdashboard" component={GovtDashboard} />
                <Route path="/companydashboard" component={CompanyDashboard} />
                <Route path="/" component={Intro} />
              </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
