import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export const PostSkeleton = () => (
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
