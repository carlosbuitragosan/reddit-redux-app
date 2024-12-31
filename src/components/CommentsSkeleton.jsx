import Skeleton from 'react-loading-skeleton';
import '../features/comments/comments.css';

const Comment = () => (
  <div className="comment__container">
    <div className="comment__info">
      <Skeleton
        height={20}
        width="15%"
        baseColor="#31363f"
        highlightColor="#444b56"
      />
      <Skeleton
        height={15}
        width="20%"
        baseColor="#31363f"
        highlightColor="#444b56"
      />
    </div>
    <Skeleton
      height={20}
      width="90%"
      baseColor="#31363f"
      highlightColor="#444b56"
      style={{ marginTop: '0.5rem' }}
    />
  </div>
);

export const CommentsSkeleton = () => (
  <div className="comments__container">
    {Array.from({ length: 5 }).map((_, index) => (
      <Comment key={index} />
    ))}
  </div>
);
