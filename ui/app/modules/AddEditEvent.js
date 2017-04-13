import {connect} from "react-redux";
import style from "./main.css";

export class AddEditEvent extends React.Component {
  render() {
    return (
      <div className={style["login-page"]}>
        main page
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps)(AddEditEvent);