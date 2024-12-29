import { useNavigate } from 'react-router-dom';

import { useGetPostCommentsQuery } from '../api/apiSlice';

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
    const renderedComments = comments.map((comment) => (
      <div key={comment.id}>{comment.body}</div>
    ));

    return (
      <div>
        <h2>Comments</h2>
        <div>{renderedComments}</div>
      </div>
    );
  }
};
