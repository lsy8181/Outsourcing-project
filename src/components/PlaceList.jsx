import { useCallback, useEffect, useState } from 'react';

const PlaceList = () => {
  const [data, setData] = useState([]);

  const forLoop = useCallback(() => {
    for (let i = 0; i < 50; i++) {
      setData((prev) => [
        ...prev,
        {
          img: '지도 이미지',
          place: '장소 이름',
          star: '별점'
        }
      ]);
    }
  }, []);

  useEffect(() => {
    forLoop();
  }, []);

  return (
    <section className="border border-blue-300 mt-5" style={{ width: '1300px' }}>
      <ul className="grid grid-cols-4 gap-6">
        {/* 나중에 li 태그를 Link 태그로 변경 or li 태그에 navigate() 함수 사용 */}
        {data.map((obj, index) => (
          <li key={index} className="border border-gray-300 p-2">
            <div className="border" style={{ width: '100%', height: '150px' }}>
              {obj.img}
            </div>
            <p>{obj.place}</p>
            <p>{obj.star}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default PlaceList;
