import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import api from '../api/api';
import { AuthContext } from '../context/AuthContext';

export default function useLike() {
  const queryClient = useQueryClient();
  const loaderData = useLoaderData();
  const { data: postData } = loaderData;
  const { user_id: curUserId } = useContext(AuthContext);

  //TODO user_id 하드코딩
  const getLikeData = {
    post_id: postData[0].post_id,
    user_id: curUserId
  };
  // console.log(getLikeData);
  const { data: likes, isLoading } = useQuery({
    queryKey: ['likes', postData[0].post_id],
    queryFn: () => api.like.getLike(getLikeData)
  });

  const { mutate: likePost } = useMutation({
    mutationFn: (likePostData) => api.like.likePost(likePostData),
    onMutate: async (likePostData) => {
      await queryClient.cancelQueries({ queryKey: ['likes', postData[0].post_id] });
      const prevLikes = queryClient.getQueryData(['likes', postData[0].post_id]);
      queryClient.setQueryData(['likes', postData[0].post_id], (old) => {
        return [...old, likePostData];
      });

      return prevLikes;
    },
    onError: (error, context) => {
      console.error('LIKE POST ERROR___', error);
      queryClient.setQueryData(['likes', postData[0].post_id], context.prevLikes);
    },
    onSettled: () => {
      queryClient.invalidateQueries(['likes', postData[0].post_id]);
    }
  });

  const { mutate: dislikePost } = useMutation({
    mutationFn: (disLikePostData) => api.like.disLikePost(disLikePostData),
    onMutate: async (disLikePostData) => {
      console.log(disLikePostData);
      await queryClient.cancelQueries({ queryKey: ['likes', postData[0].post_id] });
      const prevLikes = queryClient.getQueryData(['likes', postData[0].post_id]);
      queryClient.setQueryData(['likes', postData[0].post_id], (old) => {
        return old
          .filter((like) => like.user_id !== disLikePostData.user_id)
          .filter((like) => like.post_id_id !== disLikePostData.post_id_id);
      });

      return prevLikes;
    },
    onError: (error, context) => {
      console.error('LIKE POST ERROR___', error);
      queryClient.setQueryData(['likes', postData[0].post_id], context.prevLikes);
    },
    onSettled: () => {
      queryClient.invalidateQueries(['likes', postData[0].post_id]);
    }
  });

  const isLike = likes && likes.length > 0;

  return {
    likes,
    isLoading,
    likePost,
    dislikePost,
    isLike,
    postData
  };
}
