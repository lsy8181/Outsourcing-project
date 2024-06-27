# 프로젝트 명 : Local Spot

---

## 프로젝트 소개

- 한 줄 정리 : 주변 장소 추천 웹사이트
- 내용 : 사용자가 주변의 맛집, 카페, 미술관, 명소 등을 추천하고, 추천한 특정 장소에 대해 의견을 나눌 수 있는 웹사이트
- 목적 및 목표: 이 웹사이트를 통해 사용자들이 서로의 추천 장소를 공유하고, 커뮤니티를 형성하며, 다양한 장소에 대한 정보를 쉽게 얻을 수 있도록 한다.

## 페이지 소개

|       페이지       |                                                                                                                                                                                      소개                                                                                                                                                                                       |
| :----------------: | :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|     메인페이지     |                       <img src="https://velog.velcdn.com/images/choipoe/post/8c0ddf3b-2a6f-42de-9375-5687afbb8f61/image.png" width="700" > <br>지도 기능: 지도 API를 이용해서 지도 상에 사용자들이 추천한 장소가 마커로 표시되어 있다.<br>위치 기반 지도: 기본적으로 사용자의 위치를 기반으로 지도가 표시되어 있고, 드래그를 통해 지도를 이동시킬 수 있다.                       |
|     상세페이지     |                    <img src="https://velog.velcdn.com/images/choipoe/post/0d553ae8-8a55-4672-80b4-96910ca1651e/image.png" width="700" > <br>- 한 사용자가 생성한 추천 장소에 대한 자세한 내용을 볼 수 있다. <br>- (추가 구현) 댓글 기능을 통해 추천 장소에 대해서 서로 의견을 나눌 수 있다. <br>- 본인이 작성한 내용이라면 수정 버튼이 나오고 수정 삭제 가능                     |
|   글쓰기 페이지    |                                                  <img src="https://velog.velcdn.com/images/choipoe/post/28766840-2c5f-443f-98eb-62e228eca448/image.png" width="700" > <br> - 기능: 지도 화면에서 표시되지 않은 마커를 클릭해서 추천하고 싶은 장소를 생성할 수 있다. <br>- 글 제목, 지도화면, 글 내용, 별점, 등록하기 버튼 필요                                                   |
| 글쓰기 수정 페이지 | <img src="https://velog.velcdn.com/images/choipoe/post/9cd65214-87d2-429d-a89b-c30e3ed599f6/image.png" width="700"> <br>- 상세 페이지에서 본인이 작성한 글만 수정 버튼을 눌렀을 때 이동 가능하다 <br>- 글쓰기 페이지와 기본 ui는 비슷하게 가되 수정 전 글을 받아와서 제목, 내용,별점이 이미 들어가 있는 상태여야 하며 해당 내용을 수정하면 데이터베이스의 내용이 수정 되어야 함 |
|   로그인 페이지    |                                                                                                                <img src="https://velog.velcdn.com/images/choipoe/post/7d97c35f-3922-4910-989c-ca243735a507/image.png" width="700"> <br>기능: 로그인(인증) 기능을 통해 가입 및 로그인이 되어 있는 사용자만 웹사이트 이용이 가능하도록 사용 권한을 제한한다.                                                                                                                 |
|  회원가입 페이지   |                                                                                                                          <img src="https://velog.velcdn.com/images/choipoe/post/400a6970-3aed-4d05-bc2a-5b93fb85efeb/image.png" width="700" > <br>기능: 회원가입 기능을 통해 회원가입한 사용자만 웹사이트 이용이 가능하도록 사용 권한을 제한한다.                                                                                                                           |
|     마이페이지     |                                                                                                     <img src="https://velog.velcdn.com/images/choipoe/post/1928f19d-98e1-4ed5-ba89-ef742b9d9668/image.png" width="700" > <br>기능: 프로필(개인정보, 사진) 수정을 할 수 있다.                                                                                                     |

## 사용 라이브러리

- tanstack Query
- supabase
- react-router
- kakao map API
- tailwind
