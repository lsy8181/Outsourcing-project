import { useInfiniteQuery } from '@tanstack/react-query';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';

const { kakao } = window;

const PlaceList = ({ places }) => {
  const [staticMapObj, setStaticMapObj] = useState(null); // 정적 지도 객체
  const staticMapRef = useRef([]); // 정적 지도를 렌더링할 DOM 요소

  // const {
  //   data: places,
  //   hasNextPage,
  //   fetchNextPage,
  //   isFetchingNextPage
  // } = useInfiniteQuery({
  //   queryKey: ['places'],
  //   queryFn: forLoop, // 나중에 이 부분 바꿔야 함
  //   getNextPageParam: (lastPage) => {
  //     if (lastPage.page < lastPage.total_pages) return lastPage.page + 1;
  //   },
  //   select: (data) => {
  //     return data.pages.map((pageData) => pageData.results).flat();
  //   }
  // });

  // const { ref } = useInView({
  //   threshold: 0.3,
  //   onChange: (inView) => {
  //     if (!inView || !hasNextPage || isFetchingNextPage) return;
  //     fetchNextPage();
  //   }
  // });

  useEffect(() => {
    staticMapRef.current.forEach((ref) => {
      console.log(ref);
      places.forEach((place) => {
        if (ref.id == place.post_id) {
          const container = ref;
          // 정적 지도와 마커 생성
          const location = new kakao.maps.LatLng(place.lat, place.lon);
          const marker = {
            position: location
          };
          const options = {
            center: location,
            level: 3,
            marker: marker
          };
          const staticMap = new kakao.maps.StaticMap(container, options);
          setStaticMapObj(staticMap);
        }
      });
    });
  }, [places]);

  return (
    <section className="border border-blue-300 mt-5" style={{ width: '1400px' }}>
      <ul className="grid grid-cols-4 gap-6">
        {places.map((obj, index) => (
          <Link to={`/detail/${obj.post_id}`} key={obj.post_id} className="border border-gray-300 p-2">
            <div
              ref={(e) => (staticMapRef.current[index] = e)}
              id={obj.post_id}
              className="border"
              style={{ width: '100%', height: '200px' }}
            ></div>
            <p className="font-semibold text-lg">📍{obj.title}</p>
            <p>⭐{obj.star}</p>
            <p className="text-sm">🗒️{obj.address}</p>
          </Link>
        ))}
      </ul>
    </section>
  );
};

export default PlaceList;
