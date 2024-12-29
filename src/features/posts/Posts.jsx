import { Link } from 'react-router-dom';

export const Posts = ({ posts }) => {
  const orderedPosts = posts
    .slice()
    .sort((a, b) => b.created_utc - a.created_utc);

  // Since the API slice is just caching the exact array returned from the server, there's no specific sorting happening - whatever order the server sent back is what we've got.
  // We can't just call posts.sort() directly, because Array.sort() mutates the existing array, so we'll need to make a copy of it first. To avoid re-sorting on every rerender, we can do the sorting in a useMemo() hook. We'll also want to give posts a default empty array in case it's undefined, so that we always have an array to sort on.

  // const sortedPosts = useMemo(() => {
  //   const sortedPosts = posts.slice()
  //   // Sort posts in descending chronological order
  //   sortedPosts.sort((a, b) => b.date.localeCompare(a.date))
  //   return sortedPosts
  // }, [posts])

  // posts.map((post) => console.log('post from Posts component: ', post));
  const renderedPosts = orderedPosts.map((post) => (
    <Link key={post.id} to={`/post/${post.id}`}>
      <div>
        <h3>{post.title}</h3>
        {post.thumbnail && post.thumbnail !== 'self' && (
          <img alt={post.title} src={post.thumbnail}></img>
        )}
        <p>{post.num_comments} comments</p>
      </div>
    </Link>
  ));

  return <div>{renderedPosts}</div>;
};
