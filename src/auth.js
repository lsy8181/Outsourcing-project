export const getUserInfo = async () => {
  const accessToken = localStorage.getItem('accessToken');
  if (accessToken) {
    try {
      const response = await axios.get('');
      return response.data;
    } catch (err) {
      localStorage.clear();
    }
  }
};

export const updateProfile = async (formData) => {
  const accessToken = localStorage.getItem('accessToken');
  if (accessToken) {
    try {
      const response = await axios.patch('', formData, {});
      return response.data;
    } catch (err) {
      alert('accessToken이 만료되었습니다.');
      localStorage.clear();
    }
  }
};
