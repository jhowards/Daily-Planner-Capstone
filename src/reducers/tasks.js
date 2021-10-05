import { initialState } from "../store";

const tasksReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TASK":
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };

    case "SET_TASK_ARCHIVED":
      const index = action.payload;
      const newArray = [...state.tasks];
      if (newArray[index].archived) {
        newArray[index].archived = false;
      } else {
        newArray[index].archived = true;
      }
      return {
        ...state,
        tasks: newArray,
      };

    case "REMOVE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((task, i) => i !== action.payload),
      };

    default:
      return state;
  }
};

export default tasksReducer;
