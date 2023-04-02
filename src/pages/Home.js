import { useState, useEffect } from "react";
import axios from "axios";

function Home() {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState();
  const [count, setCount] = useState(1);

  const fetchData = async () => {
    const { data } = await axios.get(
      `https://jsonplaceholder.typicode.com/todos/${count}`
    );

    setTitle(data.title);
  };

  useEffect(() => {
    setLoading(true);
    fetchData();
    setLoading(false);
  }, [count]);

  // return <div>{title && <h1>{title}</h1>}</div>;
  return (
    <div>
      {loading ? <h2>loading...</h2> : <h1>{title}</h1>}
      <br />
      <br />
      <button onClick={() => setCount(count + 1)}>click me {count}</button>
    </div>
  );
}

export default Home;
