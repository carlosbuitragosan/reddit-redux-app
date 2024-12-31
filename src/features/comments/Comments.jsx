import { useGetPostCommentsQuery } from '../api/apiSlice';
import { TimeAgo } from '../../components/TimeAgo';
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
    return <div className="comments__container">Loading...</div>;
  } else if (isError) {
    return <div>Error: {error.messge || 'something went wrong.'}</div>;
  } else if (isSuccess) {
    const orderedComments = comments
      .slice()
      .sort((a, b) => b.created_utc - a.created_utc);

    const renderedComments = orderedComments.map((comment) => {
      // const postDate = new Date(
      //   comment.created_utc * 1000,
      // ).toLocaleDateString();

      return (
        <div key={comment.id} className="comment__container">
          <div className="comment__info">
            <p className="comment__author">{comment.author}&nbsp; • &nbsp;</p>
            <TimeAgo
              timeStamp={comment.created_utc}
              className="comment__date"
            />
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
