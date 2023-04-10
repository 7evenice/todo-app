import React from "react";
import "./App.css";
import "./index.css"
import { useState, useEffect } from "react";

function App() {
    const API_BASE = "http://localhost:3003"
    const [todos, setTodos] = useState([])
    // const [isUpdateLoading, setIsUpdateLoading] = useState(false)
    const [popupActive, setPopupActive] = useState(false)
    const [newTodo, setNewTodo] = useState("")

    useEffect(() => {
      getTodos();
    }, [])
    
    console.log(newTodo);
    // console.log(todos);

    const getTodos = () => {
      fetch(API_BASE + "/todos")
        .then(res => res.json())
        .then(data => setTodos(data))
        .catch(err => console.error("ERROR: " + err));
    }
  // const getDetail =(id) =>  {
  //   const todosDetail = todos.filter(item=>item._id===id)
  //   console.log(todosDetail[0]);
  // }
    const completeTodo = async (id) => {
      try {  
        const data = await fetch(API_BASE + "/todos/complete/" + id)
          .then(res => res.json());
        
        setTodos(todos => todos.map(todo => {
          if (todo._id === data._id) {
            todo.complete = data.complete;
          }
          return todo;
        }))
      } catch (error) {
        console.error(error);
      }
    }

    const deleteTodo = async (id) => {
      try{
        const data = await fetch(API_BASE + "/todos/delete/" + id, {
          method: "DELETE"
        }).then(res => res.json());

        setTodos(todos => todos.filter(todo => todo._id !== data._id));
      } catch (error) {
        console.error(error);
      }
    }

    const addTodo = async () => {
      try {
        const data = await fetch(API_BASE + "/todos/new", {
          method: "POST",
          headers: {
            "Content-Type": "application/json" 
          },
          body: JSON.stringify({
            text: newTodo
          })
        }).then(res => res.json());
    
        setTodos([...todos, data]);
    
        setPopupActive(false);
        setNewTodo("");
      } catch (error) {
        console.error(error);
      }
    }



    return (
      <div className="App">
        <h1>Todo-List of Nghĩa Đẹp Trai</h1>
        <h4>-------------------My Task-------------------</h4>  

        <div className="todos">
            {todos.map((todo, index) => 
              <div className={`todo ${todo.complete ? "is-complete": ""}`} onClick={() => completeTodo(todo._id)} key={todo._id}>
                <div className="stt">{++index}</div>
                <div className="checkbox"></div>
                <div className="text">{todo.text}</div>
                <div className="delete-todo" onClick={() => deleteTodo(todo._id)}>x</div>
              </div>
            )}
        </div>
        <div className="addPopup" onClick={() => setPopupActive(true)}>+</div>

			    {popupActive ? (
            <div className="popup">
              <div className="closePopup" onClick={() => setPopupActive(false)}>X</div>
              <div className="content">
                <h3>Add Task</h3>
                <input type="text" className="add-todo-input" onChange={e => setNewTodo(e.target.value)} value={newTodo} />
                <div className="button" onClick={addTodo}>Create Task</div>
              </div>
            </div>
			    ) : ''}
		  </div>
    );
  }

export default App;
