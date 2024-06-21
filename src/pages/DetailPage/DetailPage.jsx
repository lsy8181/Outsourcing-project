import React, { useContext, useEffect } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import Comments from '../../components/Comments';
import Like from '../../components/Like';
import { AuthContext, useAuth } from '../../context/AuthContext';
import './Detail.css';

const Detail = () => {
  const navigate = useNavigate();
  const loadData = useLoaderData();
  const { isLoggedIn } = useAuth();
  const { data } = loadData;
  const { user_id: curUserId } = useContext(AuthContext);
  // console.log(data[0].user_id, 'aaa', curUserId);

  const renderStars = (rating) => {
    const totalStars = 5;
    const filledStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    return (
      <>
        {Array(filledStars)
          .fill('★')
          .map((star, index) => (
            <span key={`filled-${index}`} className="star">
              {star}
            </span>
          ))}
        {hasHalfStar && <span key="half" className="half-star"></span>}
      </>
    );
  };

  useEffect(() => {
    const container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스//지도 생성 및 객체 리턴

    // 마커가 표시될 위치입니다
    const markerPosition = new kakao.maps.LatLng(data[0].lat, data[0].lon);

    // 마커를 생성합니다
    const marker = {
      position: markerPosition
    };
    const options = {
      //지도를 생성할 때 필요한 기본 옵션
      center: new kakao.maps.LatLng(data[0].lat, data[0].lon), //지도의 중심좌표.
      level: 3, //지도의 레벨(확대, 축소 정도)
      marker
    };
    const staticMap = new kakao.maps.StaticMap(container, options);
  }, []);

  return (
    <>
      <div className=" flex items-center justify-center">
        <div className="flex flex-col gap-2">
          <header className="flex">
            <h2 className="text-6xl py-11 m-2 mr-10">{data[0].title}</h2>
            <div className="text-6xl py-11 m-2">{renderStars(data[0].star / 2)}</div>
          </header>
          <div id="map" className="w-[1000px] h-[500px] bg-indigo-300 mb-5"></div>
          <div>내용</div>
          <div className="w-[1000px] h-[250px] border-2 border-slate-300 rounded-md">{data[0].contents}</div>
          {isLoggedIn && (
            <>
              <div className="flex justify-between  items-center gap-2 ">
                <div className="flex-1 flex justify-center">
                  <Like />
                </div>
                {data[0].user_id === curUserId && (
                  <button
                    onClick={() => {
                      navigate(`/edit/${data[0].post_id}`);
                    }}
                    className="bg-blue-500 hover:bg-blue-600 rounded-lg p-4  text-white text-xs "
                  >
                    수정 및 삭제
                  </button>
                )}
              </div>
            </>
          )}
          <div className="flex w-full">
            <Comments />
          </div>
        </div>
      </div>
    </>
  );
};

export default Detail;
