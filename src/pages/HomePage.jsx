import MainMap from '../components/MainMap';
import PlaceList from '../components/PlaceList';

const HomePage = () => {
  return (
    <>
      {/* 지도 화면 컴포넌트 */}
      <MainMap />
      {/* 추천 장소 리스트 컴포넌트 */}
      <PlaceList />
    </>
  );
};

export default HomePage;
