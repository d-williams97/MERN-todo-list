import React from 'react'

const Todos = (props) => {


    
  return (
    <div className="todos">
    {props.todos.map(todo => (
            <div className={`todo ${todo.complete ? 'is-complete' : ''}` } 
            key={todo._id}
            onClick={() => props.markTodoHandler(todo._id)} >
            <div className="checkbox"></div>
            <div className="text">{todo.text}</div>
            <div className="delete-todo" onClick={(e) => {
              e.stopPropagation(); // stops event bubbling up to parent element.
              props.deleteTodoHandler(todo._id);
              }}>x</div>
          </div>
    ))}
  </div>
  )
}

export default Todos