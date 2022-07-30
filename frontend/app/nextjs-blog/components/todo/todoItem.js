import React from 'react';

export default function TodoItem({
  id,
  task,
  complete,
  removeData,
  toggleComplete,
}) {
  let classes = 'list-group-item clearfix';
  if (complete) {
    classes = `${classes} list-group-item-success`;
  }

  const handleComplete = (event) => {
    toggleComplete(id);
  };

  const handleRemove = (event) => {
    removeData(id);
  };
  return (
    <li key={id} className={classes}>
      {task}
      <div className="pull-right" role="group">
        <button type="button" className="btn btn-xs btn-success img-circle" onClick={handleComplete}>&#x2713;</button>
        <button type="button" className="btn btn-xs btn-danger img-circle" onClick={handleRemove}>&#xff38;</button>
      </div>
    </li>
  );
}
