import Author from '../molecules/author';

export default function Authors(props) {
  return (
    <div className="px-8">
      <h1 className="mb-4 text-xl font-bold text-gray-700">Authors</h1>
      <div className="flex flex-col max-w-sm px-6 py-4 mx-auto bg-white rounded-lg shadow-md">
        <ul className="-mx-4">
          {props.authors.map((author) => (
            <Author author={author} />
          ))}
        </ul>
      </div>
    </div>
  );
}
