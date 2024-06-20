import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import api from '../api/api';

const { kakao } = window;
const ITEMS_PER_PAGE = 4;

const PlaceList = () => {
  const staticMapRef = useRef([]); // 정적 지도를 렌더링할 DOM 요소

  const {
    data: allPlaces,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage
  } = useInfiniteQuery({
    queryKey: ['allPlaces'],
    queryFn: ({ pageParam = 0 }) => api.post.fetchPlaces({ pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      if (!lastPage) return undefined; // lastPage가 undefined인 경우 처리
      const nextPage = lastPageParam + 1;
      return lastPage.length === ITEMS_PER_PAGE ? nextPage : undefined;
    },
    select: ({ pages }) => pages.flat()
  });

  const { ref, inView } = useInView({
    threshold: 0.5
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) fetchNextPage();
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  useEffect(() => {
    staticMapRef.current.forEach((ref) => {
      allPlaces?.forEach((place) => {
        if (ref && ref.id == place.post_id) {
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
        }
      });
    });
  }, [allPlaces]);

  return (
    <section className="border border-blue-300 mt-5" style={{ width: '1400px' }}>
      <ul className="grid grid-cols-4 gap-6">
        {allPlaces?.map((obj, index) => {
          return (
            <Link to={`/detail/${obj.post_id}`} ref={ref} key={obj.post_id} className="border border-gray-300 p-2">
              <div
                ref={(e) => (staticMapRef.current[index] = e)}
                id={obj.post_id}
                className="border"
                style={{ width: '100%', height: '200px' }}
              ></div>
              <p className="font-semibold text-lg">📍{obj.title}</p>
              <p>⭐{obj.star / 2}</p>
              <p className="text-sm">🗒️{obj.address}</p>
            </Link>
          );
        })}
      </ul>
    </section>
  );
};

export default PlaceList;
