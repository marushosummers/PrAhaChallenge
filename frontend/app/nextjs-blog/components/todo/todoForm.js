import React from 'react';
import ReactDOM from "react-dom";
import createReactClass from "create-react-class";

export default function TodoForm() {
	const doSubmit = (e) => {
		e.preventDefault();
		var task = ReactDOM.findDOMNode(this.refs.task).value.trim();
		if (!task) {
			return;
		}
		this.props.onTaskSubmit(task);
		ReactDOM.findDOMNode(this.refs.task).value = '';
		return;
	}

	return (
		<div className="commentForm vert-offset-top-2">
			<hr />
			<div className="clearfix">
				<form className="todoForm form-horizontal" onSubmit={doSubmit}>
					<div className="form-group">
						<label htmlFor="task" className="col-md-2 control-label">Task</label>
						<div className="col-md-10">
							<input type="text" id="task" ref="task" className="form-control" placeholder="What do you need to do?" />
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

