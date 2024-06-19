import { useRef } from 'react';
import { useLoaderData } from 'react-router-dom';
import useComment from '../hooks/useComment';
import { formatDate } from '../utils/formatDate';

/**
 * post_id 어떤 포스트?
 * user_id 작성자 id
 * content 댓글내용
 * created_at 생성시간
 * update_at 수정시간
 */
function Comments() {
  const loaderData = useLoaderData();
  const { data: postData } = loaderData;

  const inputRef = useRef(null);

  const { comments, isLoading, createComment } = useComment();

  const onCreateCommentHandler = async () => {
    const newCommentData = {
      post_id: postData[0].post_id,
      user_id: '463526b1-2a00-4865-bfe8-3fa504683274',
      created_at: new Date(),
      content: inputRef.current.value
    };

    console.log(newCommentData);
    const response = await createComment(newCommentData);
    console.log('CREATE COMMENT RESPONSE___', response);
  };

  return (
    <div
      className="flex flex-col max-w-[800px] w-full border-t-2 border-gray-200
      border-b-2 bg-gray-100 p-2 "
    >
      <ul className="w-full divide-y-2 divide-solid divide-gray-200">
        {!isLoading &&
          comments.data?.map(({ comment_id, content, created_at, users }) => (
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
          ))}
      </ul>

      <div className="flex flex-col gap-2 ">
        <textarea ref={inputRef} className="w-full p-2 resize-none" placeholder="댓글" maxLength={20} />
        <button
          onClick={onCreateCommentHandler}
          className=" py-2 px-6 text-xs rounded-lg border border-gray-300  ml-auto font-bold text-white
         bg-purple-500 
        hover:bg-purple-600 hover:shadow-md
        active:bg-purple-700"
        >
          버튼
        </button>
      </div>
    </div>
  );
}

export default Comments;
