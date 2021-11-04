import React, { useState } from 'react';

export default function TodoForm({addData}) {
	const [task, setTask] = useState('')
	const handleTask = (event) => {
		setTask(event.target.value)
	}
	const onSubmit = (event) => {
    event.preventDefault();
		if (!task) return;
		addData(task)
		setTask('')
	}
	return (
		<div className="commentForm vert-offset-top-2">
			<hr />
			<div className="clearfix">
				<form className="todoForm form-horizontal" onSubmit={onSubmit}>
					<div className="form-group">
						<label htmlFor="task" className="col-md-2 control-label">Task</label>
						<div className="col-md-10">
							< input type = "text"
							id = "task"
							className = "form-control"
							value = {
								task
							}
							placeholder = "What do you need to do?"
							onChange = {
								handleTask
							}
							/>
						</div>
					</div>
					<div className="row">
						<div className="col-md-10 col-md-offset-2 text-right">
							<input type="submit" value="Save Item" className="btn btn-primary" />
						</div>
					</div>
				</form>
			</div>
		</div>
	);

	};

