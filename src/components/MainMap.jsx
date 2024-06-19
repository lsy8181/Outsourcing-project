import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const { kakao } = window;

const MainMap = ({ places }) => {
  const [mapObj, setMapObj] = useState(null); // 지도 객체
  const mapRef = useRef(null); // 지도를 렌더링할 DOM 요소
  const navigate = useNavigate();

  const zoomInMap = () => {
    if (mapObj) {
      const newLevel = mapObj.getLevel() - 1;
      mapObj.setLevel(newLevel, { animate: true });
    }
  };

  const zoomOutMap = () => {
    if (mapObj) {
      const newLevel = mapObj.getLevel() + 1;
      mapObj.setLevel(newLevel, { animate: true });
    }
  };

  // const handleMapClick = (mouseEvent) => {
  //   const latlng = mouseEvent.latLng; // 클릭한 위치의 좌표
  //   if (marker && info) {
  //     marker.setPosition(latlng); // 마커 위치 설정
  //     info.open(map, marker); // 정보 설정
  //   }
  // };

  useEffect(() => {
    const container = mapRef.current; // 지도를 담을 영역의 DOM 레퍼런스
    const options = {
      center: new kakao.maps.LatLng(37.5023270151927, 127.044444694599),
      level: 7
    };

    // 지도 생성 후 상태 결정
    const map = new kakao.maps.Map(container, options); // 지도 생성 및 객체 리턴
    setMapObj(map);

    // 여러 개 마커 표시하기
    const imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png';
    for (let i = 0; i < places.length; i++) {
      const imageSize = new kakao.maps.Size(30, 43.75);
      const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
      const marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(places[i].lat, places[i].lon),
        title: places[i].title,
        image: markerImage,
        clickable: true
      });
      // marker.setMap(map);
      const iwContent = `
      <div style="padding: 5px; display: flex; flex-direction: column; justify-content: center; align-items:center; width:200px;">
        <p class="font-semibold">${places[i].title}</p>
        <p class="text-xs">${places[i].address}</p>
      </div>`;
      // 마커에 마우스 호버 시 나올 인포윈도우
      const placeInfo = new kakao.maps.InfoWindow({
        content: iwContent
      });

      kakao.maps.event.addListener(marker, 'mouseover', function () {
        placeInfo.open(map, marker);
      });

      kakao.maps.event.addListener(marker, 'mouseout', function () {
        placeInfo.close();
      });

      kakao.maps.event.addListener(marker, 'click', function () {
        navigate(`/detail/${places[i].post_id}`);
      });
    }
  }, [places]);

  return (
    <section>
      <div ref={mapRef} style={{ width: '1400px', height: '500px' }}></div>
      <div className="flex gap-3 mt-2">
        <button onClick={zoomInMap} className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">
          ZOOM IN
        </button>
        <button onClick={zoomOutMap} className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">
          ZOOM OUT
        </button>
      </div>
    </section>
  );
};

export default MainMap;
