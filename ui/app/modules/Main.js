import {connect} from "react-redux";
import style from "./main.css";
import AddEditEvent from "./AddEditEvent";
import EventList from "./EventList";
import {Route} from "react-router-dom";

export class Main extends React.Component {
  render() {
    return (
      <div className={style["app"]}>
        <div className={style["nav-bar"]}>
          <div className={style["nav-bar-title"]}>
            Allergy Diary
          </div>
        </div>

        <div className={style["app-body"]}>
          <div className={style["col-10"]}>
            <Route path={`${this.props.match.path}/event-list`} component={EventList}/>
            <Route path={`${this.props.match.path}/add-edit-event/:eventId`} component={AddEditEvent}/>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.main.get("isAuthenticated")
  };
};

export default connect(mapStateToProps)(Main);
