import Login from "./modules/Login";
import mainReducer from "./reducer";
import {Route, Router, Redirect, browserHistory} from "react-router";
import {Provider} from "react-redux";
import {createStore, combineReducers} from "redux";
import {reducer as formReducer} from "redux-form";

const reducers = {
  // ... your other reducers here ...
  main: mainReducer,
  form: formReducer
};

export class Routes extends React.Component{
  render() {
    const store = createStore(combineReducers(reducers));
    return (
      <Provider store={store}>
        <Router history={browserHistory}>
          <Route path="/login" component={Login}/>
        </Router>
      </Provider>
    );
  }
}

ReactDOM.render(<Routes/>, document.getElementById("health-app"));
