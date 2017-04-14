import Main from "./modules/Main";
import EventList from "./modules/EventList";
import AddEditEvent from "./modules/AddEditEvent";
import mainReducer from "./reducer";
import {Route, BrowserRouter} from "react-router-dom";
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
        <BrowserRouter>
          <Route path="/app" component={Main}/>
        </BrowserRouter>
      </Provider>
    );
  }
}

ReactDOM.render(<Routes/>, document.getElementById("health-app"));
