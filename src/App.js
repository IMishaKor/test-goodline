import { useEffect } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { setInit } from './redux/init-reducer';

import Navbar from './components/Navbar/Navbar';
import Registration from './components/Profile/Registration';
import Login from './components/Login/Login';
import Notes from './components/Notes/Notes';
import AddNote from './components/Notes/AddNote';
import EditNote from './components/Notes/EditNote';
import AuthObserver from './components/Login/AuthObserver';
import Page404 from './components/404';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

function App(props) {
  // Следующий код авторизовывает пользователя после обновления страници если оно того требует
  // Не нравится мне это решение, но ничего другого в голову не лезет

  const initApp = () => {
    const userId = +localStorage.getItem('AUTH_USER_ID');
    props.setInit(userId);
  };
  useEffect(initApp, [initApp]);
  if (!props.init) {
    return (
      <div className="loading d-flex justify-content-center align-items-center">
        <div className="d-inline-block">Загрузка...</div>
      </div>
    );
  }
  // *****************

  return (
    <>
      <AuthObserver />

      <Navbar />
      <div className="container">
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/registration" component={Registration} />
          <Route path="/notes/add" component={AddNote} />
          <Route path="/notes/edit/:noteId(\d+)" component={EditNote} />
          <Route path={['/notes', '/']} component={Notes} exact />
          <Route path={['*', '/404']} component={Page404} />
        </Switch>
      </div>
    </>
  );
}
const mapStateToProps = (state) => ({
  init: state.app.init,
  isAuth: state.auth.isAuth,
  userId: state.auth.authUser.userId,
});

export default connect(mapStateToProps, { setInit })(App);
