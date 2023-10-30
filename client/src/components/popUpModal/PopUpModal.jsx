import React from "react";

const PopUpModal = (props) => {
  return (
    <div className="popUp">
      <div
        className="closePopUp"
        onClick={() => props.closeModal()}
      >
        x
      </div>
      <div className="content">
        <h3>Add task</h3>
        <input
          type="text"
          className="add-todo-input"
          onChange={(e) => {
            props.setTodoHandler(e.target.value); // pass down function to set state 
          }}
          value={props.newTodo} // // pass down value
        />{" "}
        {/*value is bound to newTodo value*/}
        <div className="button" onClick={() => props.addTodoHandler()}>
          Create Task
        </div>
      </div>
    </div>
  );
};

export default PopUpModal;
