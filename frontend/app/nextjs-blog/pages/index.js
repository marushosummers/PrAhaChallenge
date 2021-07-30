import Header from '../components/organisms/header'
import Footer from '../components/organisms/footer'
import Top from '../components/pages/top'
import "tailwindcss/tailwind.css";

export default function Home() {
		return (
			<div className="overflow-x-hidden bg-gray-100">
        <Header/>
				<Top/>
	      <Footer/>
			</div>
		);
	};
