import {connect} from "react-redux";
import style from "./main.css";

export class Filter extends React.Component {
  render() {
    return (
      <div className={style["filter"]}>
        filter
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps)(Filter);
