import './App.css';
import Layout from './containers/Layout/Layout';
import ProductsDashboard from './containers/ProductsDashboard/ProductsDashboard';
import CheckoutDashboard from './containers/CheckoutDashboard/CheckoutDashboard';
import NotFound from './components/NotFound/NotFound';
import { Route, Switch } from 'react-router-dom';

function App() {
  return (
    <div>
      <Layout>
        <Switch>
          <Route path="/checkout" component={CheckoutDashboard}/>
          <Route path="/" exact component={ProductsDashboard}/>
          <Route path="*" component={NotFound}/>
        </Switch>
      </Layout>
    </div>
  );
}

export default App;