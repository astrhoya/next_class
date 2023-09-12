import React, {
  useState,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import styles from "../styles/Home.module.css";
import { useTodoContext } from "../pages/TodoContext";

const Home = forwardRef((props, ref) => {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");
  const [logs, setLogs] = useState([]);

  const todoInputRef = useRef(null);
  useImperativeHandle(ref, () => ({
    addTodo,
  }));
  const addTodo = () => {
    console.log("yo");
    if (todo.trim() === "") return;

    const newTodo = { text: todo, completed: false };
    console.log(newTodo);
    setLogs([...logs, `Added: ${newTodo.text} `]);

    setTodos([...todos, newTodo]);
    setTodo("");

    if (todoInputRef.current) {
      todoInputRef.current.value = "";
    }
  };

  const toggleComplete = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;

    const action = newTodos[index].completed ? "Completed" : "Uncompleted";
    setLogs([...logs, `${action}: ${newTodos[index].text} `]);

    setTodos(newTodos);
  };

  const removeTodo = (index) => {
    const deletedTodo = todos[index];
    const newTodos = todos.filter((_, i) => i !== index);

    setLogs([...logs, `Removed: ${deletedTodo.text} `]);

    setTodos(newTodos);
  };

  return (
    <div className={styles.maincontainer}>
      <div className={styles.container}>
        <h1 className={styles.title}>To-Do List</h1>
        <div className={styles.form}>
          <input
            type="text"
            placeholder="Add a new todo"
            value={todo}
            className={styles.input}
            onChange={(e) => setTodo(e.target.value)}
          />
          <button onClick={addTodo} className={styles.button}>
            Add
          </button>
        </div>
        <ul className={styles.list}>
          {todos.map((todo, index) => (
            <li
              key={index}
              className={todo.completed ? styles.completed : styles.nocompleted}
            >
              <input
                className={styles.checkbox}
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleComplete(index)}
              />
              <p className={styles.listItem}>{todo.text}</p>
              <button
                onClick={() => removeTodo(index)}
                className={styles.deleteButton}
              >
                X
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.logbox}>
        <h2 className={styles.title2}>Logs</h2>
        <ul>
          {logs.map((log, index) => (
            <li key={index} className="log-item">
              <span className="log-text">{log}</span>
              <span className="log-time">{new Date().toLocaleString()}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
});

export default Home;
