import { useMutation } from '@tanstack/react-query';
import api from '../api/api';

export default function usePost() {
  const { mutateAsync: createPost } = useMutation({
    mutationFn: (postData) => api.post.createPost(postData)
  });

  const { mutateAsync: updatePost } = useMutation({
    mutationFn: (newPostData) => api.post.updatePost(newPostData)
  });

  const { mutateAsync: deletePost } = useMutation({
    mutationFn: (deletePostId) => api.post.deletePost(deletePostId)
  });

  return {
    createPost,
    updatePost,
    deletePost
  };
}
