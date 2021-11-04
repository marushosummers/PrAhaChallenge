import React from 'react';
import useInput from './hooks/useInput';

export default function TodoForm({addData}) {
	const [input, handleChange, resetInput] = useInput("")

	const onSubmit = (event) => {
    event.preventDefault();
		if (!input) return;
		addData(input)
		resetInput();
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
							value = {input}
							placeholder = "What do you need to do?"
							onChange = {handleChange}
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

