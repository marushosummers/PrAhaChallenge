import Post from "../molecules/post"
import Pagination from "../molecules/pagination";

export default function Posts() {
  return (
		<div className="w-full lg:w-8/12">
			<div className="flex items-center justify-between">
				<h1 className="text-xl font-bold text-gray-700 md:text-2xl">Post</h1>
				<div>
					<select className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
						<option>Latest</option>
						<option>Last Week</option>
					</select>
				</div>
			</div>
			<Post />
			<Pagination />
		</div>
	);
}
