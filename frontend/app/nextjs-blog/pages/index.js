import TemplateTop from "../components/templates/top";
import { fetchPosts } from "../hooks/fetchPosts"
import { fetchAuthors } from "../hooks/fetchAuthors";
import { fetchCategories } from "../hooks/fetchCategories";
import { fetchRecentPosts } from "../hooks/fetchRecentPosts";

export default function Top() {
	const dummyPosts = fetchPosts();
	const dummyAuthors = fetchAuthors();
	const dummyCategories = fetchCategories();
	const dummyRecentPosts = fetchRecentPosts();

	return <TemplateTop posts = {
		dummyPosts
	}
	authors = {
		dummyAuthors
	}
	categories = {
		dummyCategories
	}
	recentPosts = {
		dummyRecentPosts
	}
	/>;
}
