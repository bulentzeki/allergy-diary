import request from "superagent";
import {browserHistory} from "react-router";


const ERROR_NOTIFICATION_TIMEOUT = 4000; /* ms */

const showErrorNotification = (req, err) =>
  triggerAlert(req.dispatch, {
    title: "Error",   // TODO: These two lines will be updated
    detail: err.response.body ? err.response.body.message : "Unknown Error", //       when backend returns meaningful error messages
    type: "error"
  }, ERROR_NOTIFICATION_TIMEOUT);

const req = {
  get(url) {
    return new Promise((resolve, reject) => {
      request
        .get(url)
        .end((err, res) => {
          if (err || !res.ok) {
            if (err.response && err.response.body && err.response.body.message && err.response.body.message === "You are not authenticated") {
              reject({error: err.response.body});
              req.dispatch({
                type: "SET_AUTH",
                Auth: I.fromJS({isAuthenticated: false})
              });
              browserHistory.push("/login");
            }
            showErrorNotification(req, err);
            reject({error: err.response.body});
          }
          resolve(res.body);
        });
    });
  },
  post(url, data) {
    return new Promise((resolve, reject) => {
      request
        .post(url)
        .send(data)
        .set("Content-Type", "application/json;charset=UTF-8")
        .end((err, res) => {
          if (err || !res.ok) {
            if (err.response && err.response.body && err.response.body.message && err.response.body.message === "You are not authenticated") {
              req.dispatch({
                type: "SET_AUTH",
                Auth: I.fromJS({isAuthenticated: false})
              });
              browserHistory.push("/login");
            }
            if (err.response && err.response.body && err.response.body.message && err.response.body.message === "You are not authorized") {
              browserHistory.push("/app/");
            }
            showErrorNotification(req, err);
            reject({error: err.response.body});
          }
          resolve(res.body);
        });
    });
  },
  put(url, data) {
    return new Promise((resolve, reject) => {
      request
        .put(url)
        .send(data)
        .set("Content-Type", "application/json;charset=UTF-8")
        .end((err, res) => {
          if (err || !res.ok) {
            if (err.response && err.response.body && err.response.body.message && err.response.body.message === "You are not authenticated") {
              req.dispatch({
                type: "SET_AUTH",
                Auth: I.fromJS({isAuthenticated: false})
              });
              browserHistory.push("/login");
            }
            showErrorNotification(req, err);
            reject({error: err.response.body});
          }
          resolve(res.body);
        });
    });
  },
  dispatch: null,
  mainRoute: "/app/"
};

export default req;
