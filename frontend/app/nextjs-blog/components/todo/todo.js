import React from 'react';
import TodoList from './todoList';
import TodoForm from './todoForm';
import useData from './hooks/useData';

export default function TodoBox() {
	const initialData = [{
			"id": "00001",
			"task": "Wake up",
			"complete": false
		},
		{
			"id": "00002",
			"task": "Eat breakfast",
			"complete": false
		},
		{
			"id": "00003",
			"task": "Go to work",
			"complete": false
		}
	]

	const [data, addData, removeData, toggleComplete] = useData(initialData);

  return (
    <div className="well">
      <h1 className="vert-offset-top-0">To do:</h1>
			<TodoList data = {
				data
			}
			removeData = {
				removeData
			}
			toggleComplete = {
				toggleComplete
			}
			/>
      <TodoForm addData={addData} />
    </div>
  );
};

