import React, { useEffect, useState } from 'react';
import { useLoaderData, useNavigate, useParams } from 'react-router-dom';
import './Detail.css';

const Detail = () => {
  const navigate = useNavigate();
  const loadData = useLoaderData();

  const { data } = loadData;

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
    const container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
    const options = {
      //지도를 생성할 때 필요한 기본 옵션
      center: new kakao.maps.LatLng(data[0].lat, data[0].lon), //지도의 중심좌표.
      level: 3 //지도의 레벨(확대, 축소 정도)
    };

    const map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

    // 마커가 표시될 위치입니다
    const markerPosition = new kakao.maps.LatLng(data[0].lat, data[0].lon);

    // 마커를 생성합니다
    const marker = new kakao.maps.Marker({
      position: markerPosition
    });

    // 마커가 지도 위에 표시되도록 설정합니다
    marker.setMap(map);
  }, []);

  return (
    <>
      <div className=" flex items-center justify-center ">
        <div>
          <header className="flex">
            <h2 className="text-6xl py-11 m-2 mr-10">{data[0].title}</h2>
            <div className="text-6xl py-11 m-2">{renderStars(data[0].star / 2)}</div>
          </header>
          <div id="map" className="w-[1000px] h-[500px] bg-indigo-300 mb-5"></div>
          <div>내용</div>
          <div className="w-[1000px] h-[250px] border-2 border-slate-300 rounded-md">{data[0].contents}</div>
          <div className="float-right">
            <button
              onClick={() => {
                navigate(`/edit/${data[0].post_id}`);
              }}
              className="bg-blue-500 hover:bg-blue-600 rounded-lg p-4 m-2 text-white"
            >
              수정
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Detail;
