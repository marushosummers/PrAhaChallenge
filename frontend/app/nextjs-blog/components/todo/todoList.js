import React from 'react';

export default function TodoList() {
	const removeNode = (nodeId) => {
		this.props.removeNode(nodeId);
		return;
	}

	const toggleComplete = (nodeId) => {
		this.props.toggleComplete(nodeId);
		return;
	}

	const listNodes = this.props.data.map(function (listItem) {
		return (
			<TodoItem key={listItem.id} nodeId={listItem.id} task={listItem.task} complete={listItem.complete} removeNode={this.removeNode} toggleComplete={this.toggleComplete} />
		);
	},this);

	return (
		<ul className="list-group">
			{listNodes}
		</ul>
	);
};

