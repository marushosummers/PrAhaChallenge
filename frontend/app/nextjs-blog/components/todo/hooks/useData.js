import { useState } from 'react';

export default function useData(initialData) {
  const [data, _useData] = useState(initialData);

  const generateId = () => Math.floor(Math.random() * 90000) + 10000;

  const addData = (task) => {
    const id = generateId().toString();
    const complete = false;
    _useData(data.concat([{
      id,
      task,
      complete,
    }]));
  };

  const removeData = (id) => {
    _useData(data.filter((todo) => todo.id !== id));
  };

  const toggleComplete = (id) => {
    _useData(data.map((todo) => {
      if (todo.id === id) {
        todo.complete = !todo.complete;
      }
      return todo;
    }));
  };
  return [data, addData, removeData, toggleComplete];
}
