import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Marker from 'sections/marker/Marker';
import { ThemeProvider } from 'styled-components';
import { theme } from 'styles/theme';
import { updateProfile } from 'firebase/auth';
import Index from 'pages/test';
import Login from 'sections/auth/Login';
import EditMarker from 'sections/marker/EditMarker';
import { useEffect} from 'react';
import { onAuthStateChanged } from '@firebase/auth';
import { AUTH } from 'myFirebase';
import Map from 'pages/home/Map';
import { Modal } from 'pages/common/Modal';
import { currentUserFullfild } from '../redux/modules/currentUserModules';
import ModifyUser from 'sections/auth/ModifyUser';
import DetailMarker from 'sections/marker/DetailMarker';
import UserLocation from 'sections/marker/UserLocation';
import { useSetQuery } from 'hooks/useQueryHook';

function Router() {
  // const { isLoading, massage, error, currentUser } = useSelector((modules) => modules.currentUserModules);

  const { mutate: setQuery } = useSetQuery({ document: 'user' });

  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribeAUth = onAuthStateChanged(AUTH, async (user) => {
      if (user) {
        dispatch(currentUserFullfild({ uid: user.uid, avatar: user.photoURL, nickname: user.displayName }));
        setQuery({
          fieldId: user.uid,
          data: { avatar: user.photoURL, uid: user.uid, nickName: user.displayName }
        });
      } else {
        dispatch(currentUserFullfild(null));
      }
    });

    return unsubscribeAUth;
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route element={<Map />} path="/">
            <Route
              element={
                <Modal>
                  <Marker />
                </Modal>
              }
              path="/marker"
            ></Route>
            <Route
              element={
                <Modal>
                  <EditMarker />
                </Modal>
              }
              path="/editMarker/:markerId"
            ></Route>
            <Route
              element={
                <Modal>
                  <Login />
                </Modal>
              }
              path="/Auth"
            ></Route>
            <Route
              path="/user/:uid"
              element={
                <Modal>
                  <ModifyUser />
                </Modal>
              }
            />
            <Route
              path="/user/location/:uid"
              element={
                <Modal>
                  <UserLocation />
                </Modal>
              }
            />
            <Route
              path="/marker/:markerId"
              element={
                <Modal>
                  <DetailMarker />
                </Modal>
              }
            ></Route>
          </Route>
          <Route path="/test" element={<Index />}></Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default Router;
