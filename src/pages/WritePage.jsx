import { useEffect, useState } from 'react';
import { useDaumPostcodePopup } from 'react-daum-postcode';

const { kakao } = window;

const themeObj = {
  //bgColor: "", //바탕 배경색
  searchBgColor: '#0B65C8', //검색창 배경색
  //contentBgColor: "", //본문 배경색(검색결과,결과없음,첫화면,검색서제스트)
  //pageBgColor: "", //페이지 배경색
  //textColor: "", //기본 글자색
  queryTextColor: '#FFFFFF' //검색창 글자색
  //postcodeTextColor: "", //우편번호 글자색
  //emphTextColor: "", //강조 글자색
  //outlineColor: "", //테두리
};

function WritePage() {
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const open = useDaumPostcodePopup('https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js');

  // 카카오맵 API
  useEffect(() => {
    const container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스

    const options = {
      //지도를 생성할 때 필요한 기본 옵션
      center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
      level: 3 //지도의 레벨(확대, 축소 정도)
    };

    setMap(new kakao.maps.Map(container, options)); //지도 생성 및 객체 리턴
    setMarker(new kakao.maps.Marker());
  }, []);

  const completeHandler = (data) => {
    let fullAddress = data.address;
    let extraAddress = '';

    const geocoder = new kakao.maps.services.Geocoder();

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }

    console.log(fullAddress); // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
    geocoder.addressSearch(fullAddress, function (result, status) {
      // 정상적으로 검색이 완료됐으면
      if (status === kakao.maps.services.Status.OK) {
        var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

        // 결과값으로 받은 위치를 마커로 표시합니다
        var marker = new kakao.maps.Marker({
          map: map,
          position: coords
        });

        // 인포윈도우로 장소에 대한 설명을 표시합니다
        var infowindow = new kakao.maps.InfoWindow({
          content: '<div style="width:150px;text-align:center;padding:6px 0;">우리회사</div>'
        });
        infowindow.open(map, marker);

        // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
        map.setCenter(coords);
      }
    });
  };

  const onClickHandler = () => {
    open({ onComplete: completeHandler });
  };

  return (
    <main>
      <div className="max-w-[1440px] bg-red-200 mx-auto flex flex-col items-center justify-center p-4">
        <h1>WritePage</h1>
        <div className="max-w-[1000px] w-full aspect-video mx-auto" id="map" />
        <div className="">
          <button onClick={onClickHandler}>버튼튼</button>
        </div>
      </div>
    </main>
  );
}

export default WritePage;
