import './styles/sb-admin-2.min.css';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { PrivateRoute } from './components';
import { Login } from './pages/Account';
import { Admin } from './pages/Admin/Admin';

function App() {
  return (
    <div className="App" id="wrapper">
      <Router>
        <Switch>
          <PrivateRoute>
            <Admin />
          </PrivateRoute>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
