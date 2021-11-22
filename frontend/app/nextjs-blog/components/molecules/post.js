import CategoryTag from '../atoms/category_tag';
import Avatar from '../atoms/avatar';
import AuthorName from '../atoms/author_name';

export default function Post(props) {
  return (
    <div className="mt-6">
      <div className="max-w-4xl px-10 py-6 mx-auto bg-white rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <span className="font-light text-gray-600">{props.post.date}</span>
          <CategoryTag href="#" name={props.post.category} />
        </div>
        <div className="mt-2">
          <a
            href="#"
            className="text-2xl font-bold text-gray-700 hover:underline"
          >
            {props.post.title}
          </a>
          <p className="mt-2 text-gray-600">{props.post.text}</p>
        </div>
        <div className="flex items-center justify-between mt-4">
          <a href="#" className="text-blue-500 hover:underline">
            Read more
          </a>
          <div>
            <a href="#" className="flex items-center">
              <Avatar src={props.post.avatar} />
              <AuthorName name={props.post.author_name} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
