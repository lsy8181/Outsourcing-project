import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useLoaderData } from 'react-router-dom';
import api from '../api/api';

export default function useComment() {
  const queryClient = useQueryClient();
  const loaderData = useLoaderData();
  const { data: postData } = loaderData;

  const { data: comments, isLoading } = useQuery({
    queryKey: ['comments', postData[0].post_id],
    queryFn: () => api.comment.getComments(postData[0].post_id)
  });

  const { mutateAsync: createComment } = useMutation({
    mutationFn: (newCommentData) => api.comment.createComment(newCommentData),
    onSuccess: () => queryClient.invalidateQueries(['comments', postData[0].post_id])
  });

  const { mutateAsync: deleteComment } = useMutation({
    mutationFn: (commentId) => api.comment.deleteComment(commentId),
    onSuccess: () => queryClient.invalidateQueries(['comments', postData[0].post_id])
  });

  return {
    comments,
    isLoading,
    createComment,
    deleteComment
  };
}
