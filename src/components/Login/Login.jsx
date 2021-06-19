import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect, NavLink } from 'react-router-dom';
import { authLogin } from '../../redux/auth-reducer';

function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmitForm = (e) => {
    e.preventDefault();

    if (!props.isFetching) {
      // проверка формы: корректность емаила
      // вывод ошибок/предупреждений
      let isError = false;
      if (!isError) {
        props.authLogin(email, password);
      } else {
        // ...
      }
    }
  };

  if (props.isAuth) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <h1 className="my-3 text-center">Авторизация</h1>
      <form onSubmit={onSubmitForm}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Адрес электронной почты
          </label>
          <input
            type="email"
            className="form-control form-control-lg"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Пароль
          </label>
          <input
            type="password"
            className="form-control form-control-lg"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <div className="d-flex justify-content-between">
          <button type="submit" className="btn btn-primary btn-lg" disabled={props.isFetching}>
            Войти
          </button>
          <NavLink className="btn btn-light btn-lg" to="/notes">
            Хотите присоединиться?
          </NavLink>
        </div>
      </form>
    </>
  );
}

const mapStateToProps = (state) => ({
  isFetching: state.auth.isFetching,
  isAuth: state.auth.isAuth,
});
export default connect(mapStateToProps, { authLogin })(Login);
