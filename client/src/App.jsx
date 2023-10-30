import { useState, useEffect } from "react";
import Todos from "./components/todos/Todos";
import AddPopUp from "./components/addPopUp/AddPopUp";
import PopUpModal from "./components/popUpModal/PopUpModal";

const API_BASE = "http://localhost:3001";

function App() {
  const [todos, setTodos] = useState([]); //
  const [popupActive, setPopupActive] = useState(false);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    getTodos();
  }, []); //Is used for side effects. This is only called once when component mounts since the second argument is an empty dependancy array.

  // --- Checking off todo --- //

  const markTodoHandler = async (id) => {
    // fetches data of select todo
    console.log("clicked");
    const data = await fetch(`${API_BASE}/todo/complete/${id}`) // we use await to get the data after the response has processed in the server.
      .then((res) => res.json()) // we use aysnch await below to precess data since we did not use another .then() to handle the processed data from the response
      .catch((err) => console.error("Error: ", err));

    setTodos((prevTodos) =>
      prevTodos.map((todo) => {
        // mapping over todos getting the prev state
        if (todo._id === data._id) {
          // checking for selected todo
          todo.complete = data.complete; // changing selected todo complete property
        }
        return todo; // returns the update todos.
      })
    );
  };

  // --- Deleting Todos --- //

  const deleteTodoHandler = async (id) => {
    const data = await fetch(`${API_BASE}/todo/delete/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .catch((err) => console.error("Error: ", err));

    setTodos(data); // Todos are returned data.
  };

  // --- Adding a Todo --- //

  const addTodoHandler = async () => {
    const data = await fetch(`${API_BASE}/todo/new`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // sets the content type header of the request. It informs the server that the req body contains JSON DATA
      },
      body: JSON.stringify({
        // converts the todo value (a string) into JSON data.
        text: newTodo,
      }),
    }).then((res) => res.json());

    setTodos([...data]); // adding the new data object to the current array of todo objects.
    setPopupActive(false);
    setNewTodo("");
  };



  // Props functions

  const addPopUpStateHandler = () => {
    // passing the state down to addPopUp
    setPopupActive(true);
  };

  const closePopUpHandler = () => {
    setPopupActive(false);
    setNewTodo('');

  }

  const setTodoHandler = (value) => {
    setNewTodo(value); // pass down function to set state
  }

  const getTodos = () => {
    // Gets the todo data from mongoDB database.
    fetch(`${API_BASE}/todos`)
      .then((res) => res.json())
      .then((data) => setTodos(data))
      .catch((err) => console.error("Error:", err));
  };




  return (
    <div className="App">
      <h1>The React Todo List</h1>
      <h4>Your tasks</h4>

      <Todos
        deleteTodoHandler={deleteTodoHandler}
        markTodoHandler={markTodoHandler}
        todos={todos}
      />

      <AddPopUp addPopUpState={addPopUpStateHandler} />

      {popupActive ? (
        <PopUpModal
        closeModal={closePopUpHandler}
        setTodoHandler={setTodoHandler}
        newTodo={newTodo}
        addTodoHandler={addTodoHandler} />
      ) : (
        ""
      )}

    </div>
  );
}

export default App;
