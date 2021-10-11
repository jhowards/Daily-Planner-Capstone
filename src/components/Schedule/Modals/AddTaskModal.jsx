import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../../css/Modals.css";
import { format } from "date-fns";

import { connect } from "react-redux";
import { addTaskAction } from "../../../actions";

const mapStateToProps = (state) => ({
  tasks: state.tasks,
});

const mapDispatchToProps = (dispatch) => ({
  addTask: (taskToAdd) => dispatch(addTaskAction(taskToAdd)),
});

const AddTaskModal = (props) => {
  const [taskToAdd, settaskToAdd] = useState({
    task: "",
    durationhr: null,
    durationmin: null,
  });

  const [show, setShow] = useState(false);
  const [selectedDate, setselectedDate] = useState(props.activeDate);
  const handleClose = () => {
    settaskToAdd((prevState) => {
      return {
        ...prevState,
        task: "",
        durationhr: null,
        durationmin: null,
      };
    });
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
    setselectedDate(props.activeDate);
  };

  function dateChange(selectedDate) {
    setselectedDate(selectedDate);
  }

  const handleInput = (e, propertyName) => {
    settaskToAdd({
      ...taskToAdd,
      [propertyName]: propertyName === "" ? "" : e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let hourstomins = null;
    let minutes = null;

    if (taskToAdd.task === "") {
      alert("Please input a task!");
    } else {
      if (taskToAdd.durationhr === null && taskToAdd.durationmin === null) {
        alert("Please input a duration!");
      } else {
        if (taskToAdd.durationhr === "" || taskToAdd.durationhr === null) {
          hourstomins = 0;
        } else {
          hourstomins = parseInt(taskToAdd.durationhr) * 60;
        }
        if (taskToAdd.durationmin === "" || taskToAdd.durationmin === null) {
          minutes = 0;
        } else {
          minutes = parseInt(taskToAdd.durationmin);
        }

        let fullduration = hourstomins + minutes;
        let id = Date.now();

        // if (props.tasks) {
        //   id = props.tasks.length + 2;
        // } else {
        //   id = 1;
        // }

        let formatDate = format(selectedDate, "P");

        let taskToAddnew = {
          id: id,
          archived: false,
          daily: false,
          task: taskToAdd.task,
          duration: fullduration,
          starttime: "",
          endtime: "",
          active: false,
          date: formatDate,
        };

        console.log(taskToAddnew);
        if (fullduration === 0) {
          alert("Please add a duration!");
        } else {
          props.addTask(taskToAddnew);
          handleClose();
        }
      }
    }
  };

  return (
    <>
      <Button
        onClick={handleShow}
        className="schedule_activeschedule_headings_autoschedule px-3 py-2 mb-1 mr-3"
      >
        <FaPlus
          size={20}
          className="schedule_activeschedule_headings_addtask mr-2"
        />
        Add Task
      </Button>

      <Modal show={show} onHide={handleClose} className="addtaskmodal">
        <Modal.Header closeButton>
          <Modal.Title>Add Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form id="addTaskForm" onSubmit={handleSubmit}>
            <Form.Group className="mb-2">
              <Form.Label className="mb-0">
                <small>Task Name</small>
              </Form.Label>
              <Form.Control
                className="border border-dark"
                size="sm"
                type="text"
                placeholder="Ex: Walk the dog"
                onChange={(e) => handleInput(e, "task")}
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label className="mb-0">
                <small>Date</small>
              </Form.Label>
              <DatePicker
                dateFormat="dd/MM/yyyy"
                locale="en-GB"
                selected={selectedDate}
                onChange={dateChange}
                todayButton="Today"
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label className="mb-0">
                <small>Duration</small>
              </Form.Label>
              <div className="d-flex flex-row">
                <Form.Control
                  className="border border-dark durationform mr-3"
                  size="sm"
                  type="number"
                  min="0"
                  placeholder="hours"
                  onChange={(e) => handleInput(e, "durationhr")}
                />
                <Form.Control
                  className="border border-dark durationform"
                  size="sm"
                  type="number"
                  min="0"
                  placeholder="minutes"
                  onChange={(e) => handleInput(e, "durationmin")}
                />
              </div>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-between">
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button className="addTaskButton" type="submit" form="addTaskForm">
            Add Task
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(AddTaskModal);