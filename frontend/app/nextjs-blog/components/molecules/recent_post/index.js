import CategoryTag from "../../atoms/category_tag";
import Avatar from "../../atoms/avatar";
import AuthorName from "../../atoms/author_name";

export default function RecentPost(props) {
	return (
		<div className="flex flex-col max-w-sm px-8 py-6 mx-auto bg-white rounded-lg shadow-md">
			<div className="flex items-center justify-center">
				<CategoryTag name={props.recentPost.category} />
			</div>
			<div className="mt-4">
				<a
					href="#"
					className="text-lg font-medium text-gray-700 hover:underline"
				>
					{props.recentPost.title}
				</a>
			</div>
			<div className="flex items-center justify-between mt-4">
				<div className="flex items-center">
					<Avatar src={props.recentPost.avatar} />
					<AuthorName name={props.recentPost.author_name} />
				</div>
				<span className="text-sm font-light text-gray-600">{props.recentPost.date}</span>
			</div>
		</div>
	);
}
