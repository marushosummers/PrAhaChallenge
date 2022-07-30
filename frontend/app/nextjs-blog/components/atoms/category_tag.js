export default function CategoryTag(props) {
  return (
    <a
      href={props.href}
      className="px-2 py-1 font-bold text-gray-100 bg-gray-600 rounded hover:bg-gray-500"
    >
      {props.name}
    </a>
  );
}
