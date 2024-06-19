import useComment from '../hooks/useComment';
import { formatDate } from '../utils/formatDate';

//TODO 삭제 시 유저 아이디 비교 후 자기꺼만 삭제할 수 있도록 해야함.
function Comment({ comment_id, users, created_at, content }) {
  const { deleteComment } = useComment();

  return (
    <li key={comment_id} className="flex items-center p-2 gap-2 w-full">
      <img className="size-12 rounded-full" src="http://via.placeholder.com/640x480" alt="tt" />
      <div className="flex flex-col w-full">
        <div className="w-full flex justify-between items-center">
          <p className="font-bold text-sm">{users.email}</p>
          <div className="flex items-center text-xs gap-x-2">
            <p className="font-bold">{formatDate(created_at)}</p>
            <button
              onClick={() => deleteComment(comment_id)}
              className="bg-red-500 border text-[10px] py-[4px] px-[8px] rounded-lg font-bold text-white
            hover:bg-red-600 hover:shadow-md
            active:bg-red-700"
            >
              삭제
            </button>
          </div>
        </div>
        <div className="line-clamp-1">{content}</div>
      </div>
    </li>
  );
}

export default Comment;
