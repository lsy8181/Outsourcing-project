import { useInfiniteQuery } from '@tanstack/react-query';
import { useCallback, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

const PlaceList = ({ places }) => {
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

  return (
    <section className="border border-blue-300 mt-5" style={{ width: '1300px' }}>
      <ul className="grid grid-cols-4 gap-6">
        {/* 나중에 li 태그를 Link 태그로 변경 or li 태그에 navigate() 함수 사용 */}
        {places.map((obj) => (
          <li key={obj.post_id} className="border border-gray-300 p-2">
            <div className="border" style={{ width: '100%', height: '150px' }}>
              {/* {obj.img} */}
              지도 사진
            </div>
            <p className="font-semibold text-lg">📍{obj.title}</p>
            <p>⭐{obj.star}</p>
            <p className="text-sm">🗒️{obj.address}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default PlaceList;
