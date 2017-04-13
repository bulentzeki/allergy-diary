import {connect} from "react-redux";
import style from "./login.css";

export class Login extends React.Component {
  render() {
    return (
      <div className={style["login-page"]}>
        login page
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    modalOpen: state.main.getIn(["Login", "modalOpen"], false),
    Lang: state.main.get("Lang"),
    isAuthenticated: state.main.get("isAuthenticated")
  };
};

export default connect(mapStateToProps)(Login);
