import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import useLike from '../hooks/useLike';

function Like() {
  const { likePost, dislikePost, isLike, postData } = useLike();
  const { user_id: curUserId } = useContext(AuthContext);

  //TODO user_id 하드코딩
  const onClickLikeHandler = async () => {
    const likePostData = {
      post_id: postData[0].post_id,
      user_id: curUserId
    };

    if (isLike) dislikePost(likePostData);
    else likePost(likePostData);
  };

  return (
    <div
      onClick={onClickLikeHandler}
      className="cursor-pointer  flex items-center justify-center border border-gray-200 bg-gray-100
    hover:bg-red-100 hover:text-red-500 hovre:shadow-lg
    active:bg-red-200 active:text-red-700
    p-2 text-lg rounded-full size-10 aspect-square"
    >
      {isLike ? <p className="text-red-600">♥</p> : '♡'}
    </div>
  );
}

export default Like;
