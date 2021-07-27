import Header from '../components/organism/header'
import Footer from '../components/organism/footer'
import Posts from '../components/organism/posts'
import Authors from '../components/organism/authors'
import Categories from '../components/organism/categories'
import RecentPosts from '../components/organism/recent_posts'
import "tailwindcss/tailwind.css";

export default function Home() {
		return (
			<div className="overflow-x-hidden bg-gray-100">
        <Header />
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
      <Footer/>
			</div>
		);
	};
