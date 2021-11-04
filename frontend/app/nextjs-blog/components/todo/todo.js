import React, { useState } from 'react';
import TodoList from './todoList';
import TodoForm from './todoForm';

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

	const [data, useData] = useState(initialData)

	const generateId = () =>  {
		return Math.floor(Math.random()*90000) + 10000;
	}

	const handleNodeRemoval = (nodeId) => {
		var data = this.state.data;
		data = data.filter(function (el) {
			return el.id !== nodeId;
		});
		this.setState({data});
		return;
	}

	const addData = (id, task, complete) => {
		useData(data.concat([{
			id,
			task,
			complete
		}])
		)
	}

	const removeData = (id) => {
		useData(data.filter(todo => todo.id !== id))
	}

	const toggleComplete = (id) => {
		useData(data.map(todo => {
			if (todo.id === id) {
				todo.complete = !todo.complete
			}
			return todo;
		}))
	}

	const onAdd = (task) => {
		const id = generateId().toString();
		const complete = false;
		addData(id, task, complete)
	}

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
      <TodoForm onAdd={onAdd} />
    </div>
  );
};

