import { formatDistanceToNow } from 'date-fns';

export const TimeAgo = ({ timeStamp }) => {
  let timeAgo = '';
  if (timeStamp) {
    const date = new Date(timeStamp * 1000);
    const timePeriod = formatDistanceToNow(date);
    timeAgo = `${timePeriod} ago`;
  }
  return (
    <time dateTime={timeStamp} title={timeStamp}>
      <i>{timeAgo}</i>
    </time>
  );
};
