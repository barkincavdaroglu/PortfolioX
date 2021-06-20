import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions"

import { Provider } from "react-redux";
import store from "./store";

import Register from './components/signinup';
import Login from './components/login';
import PrivateRoute from'./components/private-route/PrivateRoute';
import Dashboard from './screens/dashboard';
import PortfolioDetailed from './components/portfolio-details/portfolioDetailed';
import About from './screens/about/about';

if (localStorage.jwtToken) {
  const token = localStorage.jwtToken;
  setAuthToken(token);
  const decoded = jwt_decode(token);
  store.dispatch(setCurrentUser(decoded));

  const currentTime = Date.now()/1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = "./login";
  }
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="bg-color-bg bg-height bg-dashboard-mobile md:bg-dashboard">
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/about" component={About} />
          <Switch>
            <PrivateRoute exact path="/" component={Dashboard} />
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <PrivateRoute exact path="/dashboard/:name" component={PortfolioDetailed} />
          </Switch>
        </div>
     </Router>
    </Provider>
  );
}

export default App;
