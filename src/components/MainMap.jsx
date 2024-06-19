import { useEffect, useRef, useState } from 'react';

const { kakao } = window;

const MainMap = ({ places }) => {
  console.log(places);
  const [map, setMap] = useState(null); // 지도 객체
  const [level, setLevel] = useState(3); // 지도의 레벨
  const [markerList, setMarkerList] = useState([]); // 마커 객체 배열
  const [info, setInfo] = useState(null); // 정보 객체
  const mapRef = useRef(null); // 지도를 렌더링할 DOM 요소

  const zoomInMap = () => {
    if (map) {
      const newLevel = level - 1;
      map.setLevel(newLevel);
      setLevel(newLevel);
    }
  };

  const zoomOutMap = () => {
    if (map) {
      const newLevel = level + 1;
      map.setLevel(newLevel);
      setLevel(newLevel);
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
      center: new kakao.maps.LatLng(37.5023270151927, 127.044444694599), // 지도의 중심좌표
      level: 3 // 지도의 레벨(확대, 축소 정도)
    };

    // 지도 생성 후 상태 결정
    const kakaoMap = new kakao.maps.Map(container, options); // 지도 생성 및 객체 리턴
    setMap(kakaoMap);

    // 정보 생성 후 상태 결정
    const kakaoInfo = new kakao.maps.InfoWindow({
      content: `<div style="width:150px; text-align:center; padding:6px 0;">
          <button style="border: 1px solid violet; padding: 5px; border-radius: 3px; font-size: 12px;">글쓰기</button>
        </div>`,
      zindex: 1
    });
    setInfo(kakaoInfo);

    // 지도 클릭 이벤트 리스너 등록
    // kakao.maps.event.addListener(kakaoMap, 'click', handleMapClick);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      // kakao.maps.event.removeListener(kakaoMap, 'click', handleMapClick);
    };
  }, []);

  // 지도 객체, 마커 객체, 정보 객체가 모두 설정된 후 지도 클릭 이벤트 리스너 등록
  // handleMapClick(); // 함수에서 marker, info가 null인 상태를 방지하기 위함
  // useEffect(() => {
  //   if (map && marker && info) {
  //     kakao.maps.event.addListener(map, 'click', handleMapClick);
  //     return () => {
  //       kakao.maps.event.removeListener(map, 'click', handleMapClick);
  //     };
  //   }
  // }, [map, marker, info]);

  useEffect(() => {
    if (map) {
      // 기존 마커 제거
      markerList.forEach((marker) => {
        marker.setMap(null);
      });

      // 새로운 마커 생성
      const newMarkerList = places.map((place) => {
        const imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png';
        const imageSize = new kakao.maps.Size(24, 35);
        const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

        const kakaoMarker = new kakao.maps.Marker({
          map: map,
          position: new kakao.maps.LatLng(place.lat, place.lon),
          title: place.title,
          image: markerImage
        });

        kakao.maps.event.addListener(kakaoMarker, 'click', function () {
          info.setContent(`<div style="width:150px; text-align:center; padding:6px 0;">
            <button style="border: 1px solid violet; padding: 5px; border-radius: 3px; font-size: 12px;">${place.title}</button>
          </div>`);
          info.open(map, kakaoMarker);
        });

        return kakaoMarker;
      });

      setMarkerList(newMarkerList);
    }
  }, [map, places]);

  return (
    <section>
      <div ref={mapRef} style={{ width: '1300px', height: '450px' }}></div>
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
