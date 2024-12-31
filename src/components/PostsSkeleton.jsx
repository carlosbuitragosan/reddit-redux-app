import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const Post = () => (
  <div className="post__container">
    <Skeleton
      height={20}
      width="60%"
      style={{ marginBottom: '0.5rem' }}
      baseColor="#31363f"
      highlightColor="#444b56"
    />
    <Skeleton
      height={200}
      width="100%"
      style={{ marginBottom: '0.5rem' }}
      baseColor="#31363f"
      highlightColor="#444b56"
    />
    <div
      className="post__info"
      style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}
    >
      <Skeleton
        circle={true}
        height={40}
        width={40}
        baseColor="#31363f"
        highlightColor="#444b56"
      />
      <div>
        <Skeleton
          height={20}
          width="40%"
          baseColor="#31363f"
          highlightColor="#444b56"
        />
        <Skeleton
          height={20}
          width="30%"
          baseColor="#31363f"
          highlightColor="#444b56"
        />
      </div>
    </div>
    <Skeleton
      height={30}
      width="30%"
      style={{ marginTop: '1rem' }}
      baseColor="#31363f"
      highlightColor="#444b56"
    />
  </div>
);

export const PostsSkeleton = () => {
  return (
    <div className="posts">
      <h2 className="posts__title">Loading...</h2>
      <div className="posts__container">
        {Array.from({ length: 5 }).map((_, index) => (
          <Post key={index} />
        ))}
      </div>
    </div>
  );
};
