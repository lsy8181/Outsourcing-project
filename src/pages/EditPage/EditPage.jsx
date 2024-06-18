import { useEffect, useId, useRef, useState } from 'react';
import { useDaumPostcodePopup } from 'react-daum-postcode';
import { useLoaderData, useNavigate } from 'react-router-dom';
import Modal from '../../components/Modal';
import useDidMountEffect from '../../hooks/useDidMountEffect';
import { useModal } from '../../hooks/useModal';
import usePost from '../../hooks/usePost';

const { kakao } = window;

function EditPage() {
  const nav = useNavigate();
  const loaderData = useLoaderData();
  const modal = useModal();
  const { data: postData } = loaderData;
  // console.log(postData);
  // 맵
  const [map, setMap] = useState(null);
  // 마커
  const [marker, setMarker] = useState(null);
  // 위도,경도 저장용
  const [saveCoords, setSaveCoords] = useState({ lat: postData[0].lat, lon: postData[0].lon });
  // 별점 드래그 용
  const [starWidth, setStarWidth] = useState(postData[0].star);
  // input 관리용
  const inputRef = useRef([]);
  // input ID 관리용
  const addressId = useId();
  const titleId = useId();

  const { updatePost, deletePost } = usePost();

  const geocoder = new kakao.maps.services.Geocoder();
  const open = useDaumPostcodePopup('https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js');

  // 카카오맵 API
  useEffect(() => {
    const container = document.getElementById('map');

    const options = {
      center: new kakao.maps.LatLng(postData[0].lon, postData[0].lat),
      level: 3
    };

    setMap(new kakao.maps.Map(container, options));
    setMarker(new kakao.maps.Marker({ position: new kakao.maps.LatLng(postData[0].lon, postData[0].lat) }));
  }, [postData]);

  // 처음 마커 찍기
  marker?.setMap(map);

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
        console.log(coords);
        setSaveCoords({ lat: result[0].x, lon: result[0].y });

        marker.setMap(null);
        marker.setPosition(coords);
        marker.setMap(map);

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

  // Post 수정
  const onClickUpdatePostHandler = async () => {
    console.log('UPDATE TEST___');

    const newPostData = {
      post_id: postData[0].post_id,
      // created_at: new Date(),
      address: inputRef.current[0].value,
      update_at: new Date(),
      lat: saveCoords.lat,
      lon: saveCoords.lon,
      title: inputRef.current[1].value,
      contents: inputRef.current[2].value,
      star: starWidth,
      user_id: 'a7bcdd01-c602-4b1f-bbd7-6e1d03ebb38b'
    };
    console.log('NEW POST DATA___', newPostData);
    const response = await updatePost(newPostData);
    console.log('REPONSE___', response);

    nav('/', { replace: true });
  };

  // Post 삭제
  const onDeletePostHandler = async () => {
    console.log('DELETE TEST___');

    const response = await deletePost(postData[0].post_id);
    console.log('RESPONSE___', response);

    nav('/', { replace: true });
  };

  // Modal 열기
  const onOpenModalHandler = (type) => {
    const title = type === 'DEL' ? '정말로 삭제하시겠습니까?' : '정말로 수정하시겠습니까?';
    const yesFn = type === 'DEL' ? onDeletePostHandler : onClickUpdatePostHandler;
    modal.openModal(<Modal title={title} onYesHandler={yesFn} />);
  };

  return (
    <main>
      <div className="max-w-[1440px]  mx-auto flex flex-col items-center p-2 justify-center gap-6">
        <h1>EditPage</h1>

        <div className="max-w-[500px] w-full flex border border-gray-200 divide-x-2 divide-solid">
          <div className="relative w-full flex-1">
            <input
              ref={(el) => (inputRef.current[0] = el)}
              id={addressId}
              className="p-6 pb-px w-full text-base appearance-none outline-none
                     text-[#0a0426] line-clamp-1
                     hover:shadow-md peer select-none"
              type="text"
              defaultValue={postData[0].address}
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
                defaultValue={postData[0].title}
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
              defaultValue={postData[0].contents}
              className=" w-full aspect-video resize-none outline-none p-2"
              placeholder="내용을 입력해주세요"
            />
          </div>

          <div className="border border-green-400 flex w-full justify-between items-center select-none">
            <span className="text-3xl h-[40px] flex gap-2 items-baseline">
              <div className="relative cursor-pointer">
                ☆☆☆☆☆
                <span
                  style={{ width: `${starWidth}0%` }}
                  className=" text-[#FFD700] absolute top-0 left-0 overflow-hidden"
                >
                  ★★★★★
                </span>
                <input
                  onChange={(e) => setStarWidth(e.target.value)}
                  type="range"
                  className="cursor-pointer absolute size-full top-0 left-0 opacity-0"
                  step={1}
                  min={0}
                  max={10}
                />
              </div>
              <span className="text-lg font-bold">{starWidth / 2}</span>
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => onOpenModalHandler('UPD')}
                className="rounded-lg border border-gray-300 py-2 px-6 text-white font-bold  text-sm bg-[#2196F3]
                hover:bg-[#1976D2] hover:shadow-md
                active:bg-[#0D47A1]"
              >
                수정
              </button>

              <button
                onClick={() => onOpenModalHandler('DEL')}
                className="rounded-lg border border-gray-300 py-2 px-6 text-white font-bold  text-sm bg-[#F44336]
                hover:bg-[#D32F2F] hover:shadow-md
                active:bg-[#B71C1C]"
              >
                삭제
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default EditPage;
