import Category from "../molecules/category";

export default function Categories() {
  return (
		<div className="px-8 mt-10">
			<h1 className="mb-4 text-xl font-bold text-gray-700">Categories</h1>
			<div className="flex flex-col max-w-sm px-4 py-6 mx-auto bg-white rounded-lg shadow-md">
				<Category />
			</div>
		</div>
	);
}
