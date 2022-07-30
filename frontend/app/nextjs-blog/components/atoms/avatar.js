export default function Avatar(props) {
  return (
    <img
      src={props.src}
      alt="avatar"
      className="hidden object-cover w-10 h-10 mx-4 rounded-full sm:block"
    />
  );
}
