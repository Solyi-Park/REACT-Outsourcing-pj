import React, { useState } from 'react';
import styled from 'styled-components';
import { useEffect } from 'react';
import Header from './Header';
import clothes from '../../assets/clothes.png';
import toilet from '../../assets/toilet.png';
import marker from '../../assets/marker.png';
import trash from '../../assets/trash.png';
import { useNavigate, Link } from 'react-router-dom';
import { useKakaoLoader, Map as KakaoMap, MapMarker } from 'react-kakao-maps-sdk';
import { useDispatch } from 'react-redux';
import { modalOpen, modalClose } from '../../redux/modules/modalModules';
import Login from 'sections/auth/Login';
import { Modal } from 'pages/common/Modal';
// import { modalopen, modalclose } from 'redux/modules/modalModules';

function Map() {
  const [loading, error] = useKakaoLoader({
    appkey: process.env.REACT_APP_KAKAO_MAP_API_KEY // 발급 받은 APPKEY
    // ...options // 추가 옵션
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const markers = [
    {
      position: { lat: 37.478400413698, lng: 127.13538446564 },
      locationName: '슈퍼쓰레기통',
      locationid: '임시 아이디',
      img: trash
    },
    {
      position: { lat: 37.478000413698, lng: 127.13738648584 },
      locationName: '양철쓰레기통',
      locationid: '임시 아이디',
      img: trash
    },
    {
      position: { lat: 37.477800413698, lng: 127.13838849594 },
      locationName: '구리쓰레기통',
      locationid: '임시 아이디',
      img: trash
    },

    {
      position: { lat: 37.477619964555, lng: 127.13405884939 },
      locationName: '슈퍼의류수거함',
      locationid: '임시 아이디',
      img: clothes
    },
    {
      position: { lat: 37.477200413698, lng: 127.13438245614 },
      locationName: '구리양철의류수거함쓰레기통',
      locationid: '임시 아이디',
      img: clothes
    },

    {
      position: { lat: 37.477000413698, lng: 127.13388245624 },
      locationName: '슈퍼화장실',
      locationid: '임시 아이디',
      img: toilet
    },
    {
      position: { lat: 37.476800413698, lng: 127.13458245634 },
      locationName: '양철화장실',
      locationid: '임시 아이디',
      img: toilet
    }
  ];

  // const navigate = useNavigate();

  const [userLocation, setUserLocation] = useState({
    center: {
      lat: 33.450701,
      lng: 126.570667
    },
    errMsg: null,
    isLoading: true
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation((prev) => ({
            ...prev,
            center: {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            },
            isLoading: false
          }));
        },
        (err) => {
          setUserLocation((prev) => ({
            ...prev,
            errMsg: err.message,
            isLoading: false
          }));
        }
      );
    } else {
      setUserLocation((prev) => ({
        ...prev,
        errMsg: '위치를 읽을 수 없습니다.',
        isLoading: false
      }));
    }
  }, []);

  function onClickMap(_t, mouseEvent) {
    console.log(mouseEvent.latLng);
  }

  return (
    <WrappingMap>
      <KakaoMap // 지도를 표시할 Container
        onClick={onClickMap}
        id="map"
        center={
          // 지도의 중심좌표
          userLocation.center
        }
        style={{
          // 지도의 크기
          width: '100%',
          height: '100%'
        }}
        level={3} // 지도의 확대 레벨
      >
        {markers.map(({ position, img, locationName, locationid }, index) => (
          <MapMarker
            key={index}
            position={{
              lat: position.lat,
              lng: position.lng
            }}
            image={{
              src: img,
              size: { width: 30, height: 30 },
              options: {
                spriteSize: { width: 30, height: 30 },
                spriteOrigin: { x: 0, y: 0 }
              }
            }}
          ></MapMarker>
        ))}
      </KakaoMap>
      {/* <LoginBtn to="/">Login</LoginBtn> */}
      <MarkerBtn to="/marker">마커찍기</MarkerBtn>
      <LoginBtn
        onClick={() => {
          dispatch(modalOpen(<p>테스트</p>));
        }}
      >
        로그인
      </LoginBtn>
      <Modal />
    </WrappingMap>
  );
}

const LoginBtn = styled.button`
  z-index: 100;
  width: 70px;
  height: 50px;
  background-color: beige;
  position: fixed;
  top: 0;
  right: 0;
  cursor: pointer;
`;

const MarkerBtn = styled(Link)`
  z-index: 100;
  width: 70px;
  height: 50px;
  background-color: beige;
  position: fixed;
  bottom: 50%;
  right: 0;
  cursor: pointer;
`;

const WrappingMap = styled.div`
  width: 100%;
  height: 100vh;
  background-color: black;
`;

export default Map;