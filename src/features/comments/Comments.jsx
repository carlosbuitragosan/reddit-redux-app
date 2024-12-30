import { useGetPostCommentsQuery } from '../api/apiSlice';
import './comments.css';

export const Comments = ({ permalink }) => {
  const {
    data: comments = [],
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetPostCommentsQuery(permalink);

  if (!comments) return <div>Comments not found.</div>;

  if (isLoading) {
    return <div>Loading...</div>;
  } else if (isError) {
    return <div>Error: {error.messge || 'something went wrong.'}</div>;
  } else if (isSuccess) {
    comments.map((comment) => console.log('comment: ', comment));

    const renderedComments = comments.map((comment) => {
      const postDate = new Date(
        comment.created_utc * 1000,
      ).toLocaleDateString();

      return (
        <div key={comment.id} className="comment__container">
          <div className="comment__info">
            <p className="comment__author">By {comment.author} •</p>
            <p className="comment__date">{postDate}</p>
          </div>
          <p className="comment__body">{comment.body}</p>
        </div>
      );
    });

    return (
      <div>
        <div className="comments__container">{renderedComments}</div>
      </div>
    );
  }
};
