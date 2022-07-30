export default function SSG(props) {
  const stars = props.stars;

  return (
    <div>
      <p>SSG: {stars} stars</p>
    </div>
  );
	};

export async function getStaticProps(context) {
      const response = await fetch(
      	"https://api.github.com/repos/facebook/react"
      );
      const resData = await response.json();
      const stars = resData.stargazers_count;
	return {
		props: { stars }
	}
}
