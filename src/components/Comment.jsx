import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import useComment from '../hooks/useComment';
import { useToast } from '../hooks/useToast';
import { formatDate } from '../utils/formatDate';

function Comment({ comment_id, users, created_at, content, user_id }) {
  const toast = useToast();
  const { deleteComment } = useComment();
  const { user_id: curUserId } = useContext(AuthContext);
  // console.log(user_id, curUserId, users);
  const onDeleteCommentHandler = async () => {
    const response = await deleteComment(comment_id);
    // console.log('DELETE COMMENT RESPONSE___', response);

    const { error, data } = response;
    if (!data && error) {
      toast.createToast({
        title: 'FAILED',
        content: '댓글 삭제에 실패했습니다.'
      });
    } else {
      toast.createToast({
        title: 'SUCCESS',
        content: '댓글을 삭제했습니다.'
      });
    }
  };

  return (
    <li key={comment_id} className="flex items-center p-2 gap-2 w-full">
      <img className="size-12 rounded-full" src="http://via.placeholder.com/640x480" alt="tt" />
      <div className="flex flex-col w-full">
        <div className="w-full flex justify-between items-center">
          <p className="font-bold text-sm">{users?.email}</p>
          <div className="flex items-center text-xs gap-x-2">
            <p className="font-bold">{formatDate(created_at)}</p>
            {user_id === curUserId && (
              <button
                onClick={onDeleteCommentHandler}
                className="bg-red-500 border text-[10px] py-[4px] px-[8px] rounded-lg font-bold text-white
            hover:bg-red-600 hover:shadow-md
            active:bg-red-700"
              >
                삭제
              </button>
            )}
          </div>
        </div>
        <div className="line-clamp-1">{content}</div>
      </div>
    </li>
  );
}

export default Comment;
