import React, { useRef } from 'react';
import Home from './Home';

const ParentComponent = () => {
  const childRef = useRef(null);
  const handleAddTodo = (newTodo) => {
    console.log('Added from parent:', newTodo);
  };

  const handleButtonClick = () => {
    childRef.current.addTodo();
  };

  return (
    <div>
      <button onClick={handleButtonClick}>Add Todo from Parent</button>
      <Home onAddTodo={handleAddTodo} ref={childRef} />
    </div>
  );
};

export default ParentComponent;
