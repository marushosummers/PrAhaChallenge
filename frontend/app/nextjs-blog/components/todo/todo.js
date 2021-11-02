import React from 'react';
import TodoList from './todoList';
import TodoForm from './todoForm';

export default function TodoBox() {
	const getInitialState = () => {
		return {
			data: [
				{"id":"00001","task":"Wake up","complete":"false"},
				{"id":"00002","task":"Eat breakfast","complete":"false"},
        {"id":"00003","task":"Go to work","complete":"false"}
			]
		};
	}

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

	const handleSubmit = (task) => {
		var data = this.state.data;
		var id = generateId().toString();
		var complete = 'false';
		data = data.concat([{id, task, complete}]);
		this.setState({data});
	}

	const handleToggleComplete = (nodeId) => {
		var data = this.state.data;
		for (var i in data) {
			if (data[i].id == nodeId) {
				data[i].complete = data[i].complete === 'true' ? 'false' : 'true';
				break;
			}
		}
		this.setState({data});
		return;
	}

  return (
    <div className="well">
      <h1 className="vert-offset-top-0">To do:</h1>
      <TodoList data={this.state.data} removeNode={this.handleNodeRemoval} toggleComplete={this.handleToggleComplete} />
      <TodoForm onTaskSubmit={this.handleSubmit} />
    </div>
  );
};

