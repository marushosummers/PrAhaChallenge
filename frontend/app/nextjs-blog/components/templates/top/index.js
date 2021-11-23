import Posts from '../../organisms/posts';
import Authors from '../../organisms/authors';
import Categories from '../../organisms/categories';
import RecentPosts from '../../organisms/recent_posts';
import Header from '../../organisms/header';
import Footer from '../../organisms/footer';

export default function TemplateTop(props) {
  return (
    <div className="overflow-x-hidden bg-gray-100">
      <Header />
      <div className="px-6 py-8">
        <div className="container flex justify-between mx-auto">
          <Posts posts={props.posts} />
          <div className="hidden w-4/12 -mx-8 lg:block">
            <Authors authors={props.authors} />
            <Categories categories={props.categories} />
            <RecentPosts recentPosts={props.recentPosts} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
