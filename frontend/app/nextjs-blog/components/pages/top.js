import Posts from "../organisms/posts";
import Authors from "../organisms/authors";
import Categories from "../organisms/categories";
import RecentPosts from "../organisms/recent_posts";
import "tailwindcss/tailwind.css";

export default function Top() {
	return (
			<div className="px-6 py-8">
				<div className="container flex justify-between mx-auto">
					<Posts />
					<div className="hidden w-4/12 -mx-8 lg:block">
						<Authors />
						<Categories />
						<RecentPosts />
					</div>
				</div>
			</div>
	);
}
