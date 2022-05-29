import RecentPost from "../molecules/recent_post";

export default function RecentPosts(props) {
  return (
		<div className="px-8 mt-10">
			<h1 className="mb-4 text-xl font-bold text-gray-700">Recent Post</h1>
			{props.recentPosts.map((recentPost) => (
				<RecentPost recentPost={recentPost} />
			))}
		</div>
	);
}
