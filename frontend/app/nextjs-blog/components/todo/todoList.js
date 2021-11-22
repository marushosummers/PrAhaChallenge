import React from 'react';
import TodoItem from './todoItem';

export default function TodoList({
  data,
  removeData,
  toggleComplete,
}) {
  const listNodes = data.map((listItem) => (
    <TodoItem
      key={
				listItem.id
			}
      id={
				listItem.id
			}
      task={
				listItem.task
			}
      complete={
				listItem.complete
			}
      removeData={
				removeData
			}
      toggleComplete={
				toggleComplete
			}
    />
  ), this);

  return (
    <ul className="list-group">
      {listNodes}
    </ul>
  );
}
