import React from "react";
import Calendar from "react-awesome-calendar";
import SideBar from "../SideBar";
import "../Calendar/MainCalendar.css";
import { connect } from "react-redux";
import randomColor from "randomcolor";
import { setDateAction } from "../../actions";

const mapStateToProps = (state) => ({
  tasks: state.tasks,
});

const mapDispatchToProps = (dispatch) => ({
  setDate: (date) => dispatch(setDateAction(date)),
});

const MainCalendar = (props) => {
  const moveToSchedule = (event) => {
    let taskDate = props.tasks.filter((el) => el.id === event);
    let dateToPass = new Date(taskDate[0].date);
    console.log(dateToPass);
    props.setDate(dateToPass);
    props.history.push("/schedule");
  };

  // const events = [
  //   {
  //     id: 1,
  //     color: "#fd3153",
  //     from: "2021-10-10T18:00:00+00:00",
  //     to: "2021-10-10T18:00:00+00:00",
  //     title: "This is an event",
  //   },

  let tasksArray = [...props.tasks];
  tasksArray = tasksArray.map((task) => {
    return {
      id: task.id,
      color: randomColor({ hue: "blue", luminosity: "dark" }),
      from: new Date(task.date).toString(),
      to: new Date(task.date).toString(),
      title: task.task,
    };
  });
  console.log(tasksArray);

  return (
    <div className="d-flex h-100 mainwrapper">
      <SideBar />
      <div className="h-100 w-100 schedule_mainbody py-lg-3 bg-light">
        <div className="mx-lg-5">
          <Calendar
            onClickEvent={(event) => moveToSchedule(event)}
            events={tasksArray}
            className="calendartest h-100 w-100 "
          />
        </div>
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(MainCalendar);
