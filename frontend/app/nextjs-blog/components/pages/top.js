import TemplateTop from "../templates/top";

import "tailwindcss/tailwind.css";

const dummyPosts = [
	{
		date: "Jun 1, 2020",
		tag: "Lravel",
		title: "Build Your New Idea with Laravel Freamwork.",
		text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora expedita dicta totam aspernatur doloremque. Excepturi iste iusto eosenim reprehenderit nisi, accusamus delectus nihil quis facere in modi ratione libero!",
		avatar:
			"https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=731&q=80",
		author_name: "Alex John",
	},
	{
		date: "Feb 14, 2019",
		tag: "Design",
		title: "Accessibility tools for designers and developers",
		text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora expedita dicta totam aspernatur doloremque. Excepturi iste iusto eosenim reprehenderit nisi, accusamus delectus nihil quis facere in modi ratione libero!",
		avatar:
			"https://images.unsplash.com/photo-1464863979621-258859e62245?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=333&q=80",
		author_name: "Jane Doe",
	},
	{
		date: "Jun 1, 2020",
		tag: "Lravel",
		title: "Build Your New Idea with Laravel Freamwork.",
		text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora expedita dicta totam aspernatur doloremque. Excepturi iste iusto eosenim reprehenderit nisi, accusamus delectus nihil quis facere in modi ratione libero!",
		avatar:
			"https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=731&q=80",
		author_name: "Alex John",
	},
	{
		date: "Feb 14, 2019",
		tag: "Design",
		title: "Accessibility tools for designers and developers",
		text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora expedita dicta totam aspernatur doloremque. Excepturi iste iusto eosenim reprehenderit nisi, accusamus delectus nihil quis facere in modi ratione libero!",
		avatar:
			"https://images.unsplash.com/photo-1464863979621-258859e62245?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=333&q=80",
		author_name: "Jane Doe",
	},
];


const dummyAuthors = [
	{
		avatar:
			"https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=731&q=80",
		name: "Alex John",
		post_count: 23,
	},
	{
		avatar:
			"https://images.unsplash.com/photo-1464863979621-258859e62245?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=333&q=80",
		name: "Jane Doe",
		post_count: 52,
	},
];
const dummyCategories = [{}]
const dummyRecentPosts = [{}]

export default function Top() {
	return <TemplateTop posts={dummyPosts} authors={dummyAuthors} categories={dummyCategories} recent_posts={dummyRecentPosts}/>;
}
