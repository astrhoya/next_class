// TodoContext.js
import React, { createContext, useReducer, useContext } from 'react';

// Define initial state
const initialState = {
  todos: [],
};

// Define actions
const ADD_TODO = 'ADD_TODO';
const TOGGLE_COMPLETE = 'TOGGLE_COMPLETE';
const REMOVE_TODO = 'REMOVE_TODO';

const todoReducer = (state, action) => {
  switch (action.type) {
    case ADD_TODO:
      return {
        todos: [...state.todos, action.payload],
      };
    case TOGGLE_COMPLETE:
      const updatedTodos = state.todos.map((todo, index) => {
        if (index === action.payload) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      });
      return {
        todos: updatedTodos,
      };
    case REMOVE_TODO:
      const filteredTodos = state.todos.filter((_, index) => index !== action.payload);
      return {
        todos: filteredTodos,
      };
    default:
      return state;
  }
};

const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  const addTodo = (text) => {
    dispatch({ type: ADD_TODO, payload: { text, completed: false } });
  };

  const toggleComplete = (index) => {
    dispatch({ type: TOGGLE_COMPLETE, payload: index });
  };

  const removeTodo = (index) => {
    dispatch({ type: REMOVE_TODO, payload: index });
  };

  return (
    <TodoContext.Provider
      value={{
        todos: state.todos,
        addTodo,
        toggleComplete,
        removeTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useTodoContext = () => {
  return useContext(TodoContext);
};
