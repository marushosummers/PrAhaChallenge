export default function AuthorName(props) {
	return (
		<a href={props.href} className="mx-1 font-bold text-gray-700 hover:underline">{props.name}</a>
	);
}
