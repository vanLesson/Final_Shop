import React from "react";
import { Provider } from "react-redux";
import { Router, Route } from 'react-router-dom';
import createHistory from "history/createBrowserHistory";
import { Link } from 'react-router-dom';
import { store } from '../src/Components/Store/store'
import { CUserName, CLogoutButton } from '../src/Components/Reducers/Actions/actionRegistration'
import { CCategoriesList, CCategoryPage, CGoodPage, CPromiseStatus } from "../src/Components/Goods/goods"
import { CInvalidMessageForSignIn, CInvalidMessage } from "../src/Components/Validation/validation"
import { CLoginForm, CRegForm } from "../src/Components/SignIn/SignInForm/SignIncomponents"
import { ConnectedCart, CBasketOne, COrderReady } from "../src/Components/Basket/basket"
import { CRoledRoute } from "../src/Components/RoledRoute/roledRoute"
import "../src/App.css"

const CCart = () => <div></div>

const App = () => {


  return (
    <>

      <Provider store={store}>
        <Router history={createHistory()}>
          <header className="header" >
            <nav>
              <Link to="/">Main</Link>
              <Link to="/Cart">CARZINA</Link>
              <Link to="/SignIn">SignIn</Link>
              <Link to="/SignUp">SignUp</Link>
            </nav>
            <div className="user">
              <CUserName />
              <CLogoutButton />
              <CPromiseStatus />
            </div>
          </header>
          <div>
            <div className="categoriList"> <Route path="/" component={CCategoriesList} /></div>
            <div className="forms">
              <Route path="/SignIn" component={CInvalidMessageForSignIn} />
              <Route path="/SignIn" component={CLoginForm} />
              <Route path="/SignUp" component={CInvalidMessage} />
              <Route path="/SignUp" component={CRegForm} />
            </div>
            <div className="categorriPage">
              <Route path="/category/:_id" component={CCategoryPage} />
            </div>
            <CRoledRoute path="/cart" component={CCart} roles={["user", "admin"]} fallback="/SignIn" />
            <Route path="/good/:_id" component={CGoodPage} />
          </div>
          <Route path="/Cart" component={ConnectedCart} />
          <Route path="/cart" component={COrderReady} />
          <Route path="/Cart" component={CBasketOne} />

        </Router>
      </Provider>

    </>
  );
};

export default App;
