export default function SSR(props) {
  const stars = props.stars;

  return (
    <div>
      <p>SSR: {stars} stars</p>
    </div>
  );
	};

export async function getServerSideProps(context) {
      const response = await fetch(
      	"https://api.github.com/repos/facebook/react"
      );
      const resData = await response.json();
      const stars = resData.stargazers_count;
	return {
		props: { stars }
	}
}
