import { formatDate } from '../utils/formatDate';

function Comment({ comment_id, users, created_at, content }) {
  return (
    <li key={comment_id} className="flex items-center p-2 gap-2 w-full">
      <img className="size-12 rounded-full" src="http://via.placeholder.com/640x480" alt="tt" />
      <div className="flex flex-col w-full">
        <div className="w-full flex justify-between items-center">
          <p className="font-bold text-sm">{users.email}</p>
          <p className="font-bold text-xs">{formatDate(created_at)}</p>
        </div>
        <div className="line-clamp-1">{content}</div>
      </div>
    </li>
  );
}

export default Comment;
