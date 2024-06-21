import MainMap from '../../components/MainMap';
import PlaceList from '../../components/PlaceList';

const HomePage = () => {
  return (
    <div className="flex flex-col justify-center items-center h-full">
      <MainMap />
      <PlaceList />
    </div>
  );
};

export default HomePage;
