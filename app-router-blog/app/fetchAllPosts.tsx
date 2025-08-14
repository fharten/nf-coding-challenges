const fetchAllPosts = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const data = res.json();

  return data;
};

export default fetchAllPosts;
