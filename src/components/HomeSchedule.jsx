import React from "react";
import { FaBell } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Card, Row, Col } from "react-bootstrap";
import format from "date-fns/format";
import { connect } from "react-redux";

const mapStateToProps = (state) => ({
  tasks: state.tasks,
});

const HomeSchedule = (props) => {
  const date = new Date();
  const formatDateText = format(date, "do LLLL yyyy");

  let formatCurrentDate = format(date, "P");
  let todaysDateArray = props.tasks.filter(
    (el) => el.date === formatCurrentDate
  );
  const arrlength = todaysDateArray.length;
  console.log(arrlength);
  return (
    <Card.Body className="h-100 ml-4">
      <Card.Title className="home_schedule_todaytext">
        <Link to="/schedule">Today's Tasks</Link>
      </Card.Title>

      <Card.Text className="home_schedule_datetext mb-4">
        {formatDateText}
      </Card.Text>
      <div className="d-flex flex-column">
        {props.tasks
          ? props.tasks.map((task, i) =>
              task.date === formatCurrentDate ? (
                <Row className="mx-0 rowborder mb-4" key={task.id}>
                  <Col xs={1}>
                    <FaBell size={18} onClick={console.log(i)} />
                    {arrlength === i + 1 ? (
                      ""
                    ) : (
                      <div className="home_schedule_divider mx-2"></div>
                    )}
                  </Col>
                  <Col xs={11}>
                    {/* IS TASK ARCHIVED? */}
                    {task.archived ? (
                      <>
                        <s className="home_schedule_tasks_maintext ml-2 mb-0 d-block">
                          {task.task}
                          {task.daily ? (
                            <span className="ml-4 home_schedule_tasks_dailybadge">
                              Daily
                            </span>
                          ) : (
                            ""
                          )}
                        </s>
                        <s className="home_schedule_tasks_timetext ml-2 mb-0 d-block">
                          7:20 AM
                        </s>
                      </>
                    ) : (
                      <>
                        <p className="home_schedule_tasks_maintext ml-2 mb-0">
                          {task.task}
                          {task.daily ? (
                            <span className="ml-4 home_schedule_tasks_dailybadge">
                              Daily
                            </span>
                          ) : (
                            ""
                          )}
                        </p>
                        <p className="home_schedule_tasks_timetext ml-2 mb-0">
                          7:20 AM
                        </p>
                      </>
                    )}
                  </Col>
                </Row>
              ) : (
                ""
              )
            )
          : ""}
      </div>
    </Card.Body>
  );
};

export default connect(mapStateToProps)(HomeSchedule);
