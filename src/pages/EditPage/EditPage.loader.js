import api from '../../api/api';

export default async function editPageLoader({ params }) {
  const { postId } = params;
  const response = await api.post.getPost(postId);
  // console.log('EDIT LOADER___', response);
  return response;
}
