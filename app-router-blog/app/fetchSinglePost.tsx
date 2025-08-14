const fetchSinglePost = async (id: number) => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  const data = res.json();

  return data;
};

export default fetchSinglePost;
