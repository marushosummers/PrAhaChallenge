import TodoBox from '../../components/todo/todo';

export default function Home() {
  return (
    <section className="container vert-offset-top-2">
      <div className="todoBox col-xs-6 col-xs-offset-3">
        <TodoBox />
      </div>
    </section>
  );
}
