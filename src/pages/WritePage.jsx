import { useMutation } from '@tanstack/react-query';
import { useEffect, useId, useRef, useState } from 'react';
import { useDaumPostcodePopup } from 'react-daum-postcode';
import { v4 as uuidv4 } from 'uuid';
import useDidMountEffect from '../hooks/useDidMountEffect';
import supabase from '../supabase/supabase';

const { kakao } = window;

function WritePage() {
  // 맵
  const [map, setMap] = useState(null);
  // 마커
  const [marker, setMarker] = useState(null);
  // 위도,경도 저장용
  const [saveCoords, setSaveCoords] = useState({ lat: null, lon: null });
  // 별점 드래그 용
  const [starWidth, setStarWidth] = useState(0);
  // input 관리용
  const inputRef = useRef([]);
  // input ID 관리용
  const addressId = useId();
  const titleId = useId();

  const { mutateAsync: createPost } = useMutation({
    mutationFn: (postData) => supabase.from('posts').insert(postData)
  });

  const geocoder = new kakao.maps.services.Geocoder();
  const open = useDaumPostcodePopup('https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js');

  // 카카오맵 API
  useEffect(() => {
    const container = document.getElementById('map');

    const options = {
      center: new kakao.maps.LatLng(37.5023270151927, 127.044444694599),
      level: 3
    };

    setMap(new kakao.maps.Map(container, options));
    setMarker(new kakao.maps.Marker());
  }, []);

  // 검색 성공 시
  const completeHandler = (data) => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }

    inputRef.current[0].value = fullAddress;

    // 주소로 마커찍기
    geocoder.addressSearch(fullAddress, function (result, status) {
      if (status === kakao.maps.services.Status.OK) {
        const coords = new kakao.maps.LatLng(result[0].y, result[0].x);
        setSaveCoords({ lat: result[0].y, lon: result[0].x });
        // console.log(coords);

        marker.setMap(null);
        marker.setPosition(coords);
        marker.setMap(map);

        // const infowindow = new kakao.maps.InfoWindow({
        //   content: '<div style="width:150px;text-align:center;padding:6px 0;">우리회사</div>'
        // });
        // infowindow.open(map, marker);

        map.setCenter(coords);
      }
    });
  };

  // 주소 찾기 클릭 시
  const onClickHandler = () => {
    open({ onComplete: completeHandler });
  };

  // 첫 렌더링 제외
  useDidMountEffect(() => {
    kakao.maps.event.addListener(map, 'click', function (mouseEvent) {
      const coords = mouseEvent.latLng;
      setSaveCoords({ lat: coords.La, lon: coords.Ma });

      // 위도,경도로 주소 찾기
      geocoder.coord2Address(coords.getLng(), coords.getLat(), (result, status) => {
        if (status === kakao.maps.services.Status.OK) {
          inputRef.current[0].value = result[0].road_address
            ? result[0].road_address.address_name
            : inputRef.current[0].value;
        }

        marker.setMap(null);
        marker.setPosition(coords);
        marker.setMap(map);
      });
    });
  }, [map, marker]);

  const test = async () => {
    /**
 *
post_id bigint int8
created_at timestamp with time zone	timestamptz
lat double precision	float8
lon double precision	float8
update_at timestamp with time zone	timestamptz
title text	text
contents text	text
star bigint	int8
user_id uuid	uuid
 *
 */
    console.log('WRITE TEST___');
    console.log('POSTID___', uuidv4());
    console.log('CREATED_AT___', new Date());
    console.log('ADDRESS___', inputRef.current[0].value);
    console.log('LAT___', saveCoords.lat);
    console.log('LON___', saveCoords.lon);
    console.log('UPDATED_AT___', null);
    console.log('TITLE___', inputRef.current[1].value);
    console.log('CONTENTS___', inputRef.current[2].value);
    console.log('STAR___', starWidth * 10);
    console.log('USERID___', 'user id');

    const newPostData = {
      post_id: uuidv4(),
      created_at: new Date(),
      lat: saveCoords.lat,
      lon: saveCoords.lon,
      title: inputRef.current[1].value,
      contents: inputRef.current[2].value,
      star: starWidth,
      user_id: uuidv4()
    };

    const response = await createPost(newPostData);
    console.log('REPONSE___', response);
  };

  return (
    <main>
      <div className="max-w-[1440px] bg-red-200 mx-auto flex flex-col items-center p-2 justify-center gap-6">
        <h1>WritePage</h1>

        <div className="max-w-[500px] w-full flex border border-gray-200 divide-x-2 divide-solid">
          <div className="relative w-full flex-1">
            <input
              ref={(el) => (inputRef.current[0] = el)}
              id={addressId}
              className="p-6 pb-px w-full text-base appearance-none outline-none
                     text-[#0a0426] line-clamp-1
                     hover:shadow-md peer select-none"
              type="text"
              placeholder=""
              readOnly
            />
            <label
              htmlFor={addressId}
              className="absolute top-4 left-6 text-base select-none text-[#a1a1aa] cursor-text
                     duration-150 transform
                     origin-[0]
                     -translate-y-3 scale-75
                     peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0
                     peer-focus:scale-75 peer-focus:-translate-y-3"
            >
              선택된 주소
            </label>
          </div>
          <button className="w-fit text-sm" onClick={onClickHandler}>
            주소찾기
          </button>
        </div>

        <div className="max-w-[800px] w-full flex flex-col gap-3">
          <div className="border border-blue-600 w-full aspect-video mx-auto" id="map" />
          <div className="border border-violet-600 divide-y-2 divide-solid">
            <div className="relative w-full">
              <input
                ref={(el) => (inputRef.current[1] = el)}
                id={titleId}
                className="p-2 pb-px w-full text-base appearance-none outline-none h-[50px]
                     text-[#0a0426] line-clamp-1
                     peer select-none"
                type="text"
                placeholder=""
              />
              <label
                htmlFor={titleId}
                className="absolute top-3 left-2 text-base select-none text-[#a1a1aa] cursor-text
                     duration-150 transform
                     origin-[0]
                     -translate-y-3 scale-75
                     peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0
                     peer-focus:scale-75 peer-focus:-translate-y-3"
              >
                제목
              </label>
            </div>
            <textarea
              ref={(el) => (inputRef.current[2] = el)}
              className=" w-full aspect-video resize-none outline-none p-2"
              placeholder="내용을 입력해주세요"
            />
          </div>

          <div className="border border-green-400 flex w-full justify-between items-center">
            <span className="text-3xl h-[40px] flex gap-2 items-baseline">
              <div className="relative">
                ☆☆☆☆☆
                <span style={{ width: `${starWidth}0%` }} className="absolute top-0 left-0 overflow-hidden">
                  ★★★★★
                </span>
                <input
                  onChange={(e) => setStarWidth(e.target.value)}
                  type="range"
                  className="absolute size-full top-0 left-0 opacity-0"
                  step={1}
                  min={0}
                  max={10}
                />
              </div>
              <span className="text-lg font-bold">{starWidth / 2}</span>
            </span>

            <button onClick={test} className="rounded-lg border border-gray-300 py-2 px-6 bg-gray-50">
              글 쓰기
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default WritePage;
