import './styles/sb-admin-2.min.css';
import './assets/fontawesome-free/css/all.min.css';
import './styles/style.css'
import { Route, Router, Switch } from 'react-router-dom';
import { PrivateRoute } from './components';
import {
  Login,
  ForgotPassword,
  ResetPassword
} from './pages/Account';
import { Admin } from './pages/Admin/Admin';
import { AccountRoute } from './components/AccountRoute';
import { history } from './helpers';
import { useSelector } from 'react-redux';
import { AppState } from './store';
import { useState } from 'react';

function App() {
  const [account] = useState(useSelector((state: AppState) => state.account));

  return (
    <div className="App" id="wrapper">
      <Router history={history}>
        <Switch>
          {account.accessToken === null ?
            <Route path='/forgot-password' component={ForgotPassword} /> : ''
          }
          {account.accessToken === null ?
            <Route path='/reset-password/:token' component={ResetPassword} /> : ''
          }
          <PrivateRoute>
            <AccountRoute path='/login'>
              <Login />
            </AccountRoute>
            <PrivateRoute path='/'>
              <Admin />
            </PrivateRoute>
          </PrivateRoute>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
