export default function RecentPosts() {
  return (
		<div className="px-8 mt-10">
			<h1 className="mb-4 text-xl font-bold text-gray-700">Recent Post</h1>
			<div className="flex flex-col max-w-sm px-8 py-6 mx-auto bg-white rounded-lg shadow-md">
				<div className="flex items-center justify-center">
					<a
						href="#"
						className="px-2 py-1 text-sm text-green-100 bg-gray-600 rounded hover:bg-gray-500"
					>
						Laravel
					</a>
				</div>
				<div className="mt-4">
					<a
						href="#"
						className="text-lg font-medium text-gray-700 hover:underline"
					>
						Build Your New Idea with Laravel Freamwork.
					</a>
				</div>
				<div className="flex items-center justify-between mt-4">
					<div className="flex items-center">
						<img
							src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=731&q=80"
							alt="avatar"
							className="object-cover w-8 h-8 rounded-full"
						/>
						<a href="#" className="mx-3 text-sm text-gray-700 hover:underline">
							Alex John
						</a>
					</div>
					<span className="text-sm font-light text-gray-600">Jun 1, 2020</span>
				</div>
			</div>
		</div>
	);
}
