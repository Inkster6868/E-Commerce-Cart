import Products from "./components/Products/Products";
import Header from "./components/Layout/Header"
import Subheader from "./components/Layout/Subheader";
import { Switch, Route, Redirect } from "react-router-dom";
import AuthIndex from "./components/Auth";
import { useEffect } from "react";
import { checkIsLoggedIn } from "./actions/auth";
import { useDispatch, useSelector } from "react-redux";

const App = () => {
  const dispatch = useDispatch()
  const authState = useSelector(state => state.auth)

  useEffect(() => {
    dispatch(checkIsLoggedIn(() => {}))
  }, [])

  return (
    <div>
      <Header/>
      <Subheader/>
      {/* //switch statement is basically used taaki koi ek render hoga after the any of them is matched the router exits 
      //exact means the exact url should get matched */}
      <Switch>
        {
          !authState.idToken &&
          <Route path="/:type(login|signup)" exact>
          {/* //specifying the path for whihc we will display the AuthIndex */}
            <AuthIndex/>
          </Route>
        }
        <Redirect to="/" from="/login"/>
        {/* if login or signup Successfully then return to home(/) */}
        <Redirect to="/" from="/signup"/>
        <Route path="/404" exact>
          <h1>Not Found!</h1>
        </Route>
        <Route path="/:category?" exact>
          <Products />
        </Route>
        <Redirect to="/404"/>
      </Switch>
    </div>
  );
}

export default App;
