import Avatar from "../atoms/avatar";
import AuthorName from "../atoms/author_name";

export default function Author(props) {
	return (
		<li className="flex items-center">
			<Avatar src={props.author.avatar} />

			<p>
				<AuthorName name={props.author.name} />
				<span className="text-sm font-light text-gray-700">
					Created {props.author.post_count} Posts
				</span>
			</p>
		</li>
	);
}
