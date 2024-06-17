import { useEffect } from 'react';

const { kakao } = window;
function WritePage() {
  useEffect(() => {
    const container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스

    const options = {
      //지도를 생성할 때 필요한 기본 옵션
      center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
      level: 3 //지도의 레벨(확대, 축소 정도)
    };

    const map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
    console.log(map);
  }, []);

  return (
    <main>
      <div className="max-w-[1440px] bg-red-200 mx-auto flex flex-col items-center justify-center p-4">
        <h1>WritePage</h1>
        <div className="max-w-[1000px] w-full aspect-video mx-auto" id="map"></div>
      </div>
    </main>
  );
}

export default WritePage;
