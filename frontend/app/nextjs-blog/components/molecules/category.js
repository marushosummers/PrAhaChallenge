export default function Category(props) {
  return (
    <li>
      <a
        href="#"
        className="mx-1 font-bold text-gray-700 hover:text-gray-600 hover:underline"
      >
        -
        {' '}
        {props.category.name}
      </a>
    </li>
  );
}
