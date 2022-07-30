import Navigator from '../molecules/nav';

export default function Header() {
  return (
    <nav className="px-6 py-4 bg-white shadow">
      <div className="container flex flex-col mx-auto md:flex-row md:items-center md:justify-between">
        <div className="flex items-center justify-between">
          <div>
            <a href="#" className="text-xl font-bold text-gray-800 md:text-2xl">
              Brand
            </a>
          </div>
        </div>
        <Navigator />
      </div>
    </nav>
  );
}
