import {connect} from "react-redux";
import style from "./main.css";

export class Event extends React.Component {
  constructor(props) {
    super(props);
    this.colorClassMapping = {
      red: "row-container",
      yellow: "yellow-row-container",
      orange: "orange-row-container",
    };
  }
  render() {
    let colorClass = "yellow-row-container";
    if (this.props.data.get("color")) {
      colorClass = this.colorClassMapping[this.props.data.get("color")] || "yellow-row-container";
    }
    return (
      <div className={style[colorClass]}>
        {this.props.data.get("date")}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps)(Event);
