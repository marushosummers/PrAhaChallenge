export default function Navigator() {
  return (
    <div className="flex-col hidden md:flex md:flex-row md:-mx-4">
      <a
        href="#"
        className="my-1 text-gray-800 hover:text-blue-500 md:mx-4 md:my-0"
      >
        Home
      </a>
      <a
        href="#"
        className="my-1 text-gray-800 hover:text-blue-500 md:mx-4 md:my-0"
      >
        Blog
      </a>
      <a
        href="#"
        className="my-1 text-gray-800 hover:text-blue-500 md:mx-4 md:my-0"
      >
        About us
      </a>
    </div>
  );
}
