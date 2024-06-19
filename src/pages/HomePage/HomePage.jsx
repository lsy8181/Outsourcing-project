import MainMap from '../../components/MainMap';
import PlaceList from '../../components/PlaceList';
import { useQuery } from '@tanstack/react-query';
import api from '../../api/api';

const HomePage = () => {
  const {
    isLoading,
    isError,
    data: places
  } = useQuery({
    queryKey: ['places'],
    queryFn: () => api.post.getPosts()
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {isError.message}</div>;

  return (
    <>
      {places && (
        <div className="flex flex-col justify-center items-center h-full">
          <MainMap places={places} />
          <PlaceList places={places} />
        </div>
      )}
    </>
  );
};

export default HomePage;
