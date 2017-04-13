if (!window.user) {
  window.user = {};
}
let initialState = I.fromJS({Lang: "", isAuthenticated: window.user.isAuthenticated});

const storeActors = {
  ADD_NOTIFICATION: (state, action) => {
    return state.set("Alerts", state.get("Alerts", new I.List()).push(action.alert));
  },
  REMOVE_NOTIFICATION: (state, action) => {
    return state.set("Alerts", state.get("Alerts").delete(state.get("Alerts").indexOf({id: action.id})));
  },
  TOGGLE_FORGOT_PASSWORD_MODAL: (state, action) => {
    return state.setIn(["Login", "modalOpen"], action.active);
  }
};


const mainReducer = (state = initialState, action) => {
  const actor = storeActors[action.type];
  if (actor) {
    return actor(state, action);
  }
  return state;
};

export default mainReducer;
