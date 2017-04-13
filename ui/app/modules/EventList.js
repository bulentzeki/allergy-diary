import {connect} from "react-redux";
import style from "./main.css";
import Event from "./Event";
import Filter from "./Filter";

export class Login extends React.Component {
  render() {
    return (
      <div className={style["row"]}>
        <Filter/>
        <div className={style["row"]}>
          {this.props.eventList.entrySeq().map(entry => <Event key={entry[0]} id={entry[0]} data={entry[1]}></Event>)}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    eventList: I.fromJS({
      "uuid-1": {
        date: "mayıs",
        symptomList: ["1", "2"],
        factors: [],
        color: "yellow"
      }, "uuid-2": {
        date: "mayıs2",
        symptomList: ["12", "22"],
        factors: [],
        color: "orange"
      }, "uuid-3": {
        date: "mayıs12",
        symptomList: ["132", "232"],
        factors: [],
        color: "red"
      }, "uuid-4": {
        date: "mayıs23",
        symptomList: ["1322", "2322"],
        factors: [],
        color: "yellow"
      }
    })
  };
};

export default connect(mapStateToProps)(Login);
