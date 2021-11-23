import React from 'react';
import TodoBox from '../../components/todo/todo';

const Home = function () {
  return (
    <section className="container vert-offset-top-2">
      <div className="todoBox col-xs-6 col-xs-offset-3">
        <TodoBox />
      </div>
    </section>
  );
};

export default Home;
