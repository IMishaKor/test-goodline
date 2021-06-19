import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { addUser } from '../../redux/profile-reducer';

function Registration(props) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const onSubmitForm = (e) => {
    e.preventDefault();

    if (!props.isFetching) {
      // проверка формы: корректность емаила, совпадение паролей
      // вывод ошибок/предупреждений
      let isError = false;
      if (password !== passwordConfirm) {
        console.log('Пароли не совпадают');
        isError = true;
      }
      if (!isError) {
        props
          .addUser(email, name, password)
          .then((d) =>
            console.log(
              'Тут можно настроить дальнейшее поведение формы: вывод ошибок, обнуление полей, редирект на авторизацию и т.п.'
            )
          );
      } else {
        // Показываем сообщение о допущенных ошибках
      }
    }
  };

  if (props.isAuth) {
    return <Redirect to="/" />;
  }

  return (
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
        <label htmlFor="name" className="form-label">
          Имя
        </label>
        <input
          type="text"
          className="form-control form-control-lg"
          id="name"
          onChange={(e) => setName(e.target.value)}
          value={name}
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
      <div className="mb-3">
        <label htmlFor="passwordConfirm" className="form-label">
          Введите пароль ещё раз
        </label>
        <input
          type="password"
          className="form-control form-control-lg"
          id="passwordConfirm"
          onChange={(e) => setPasswordConfirm(e.target.value)}
          value={passwordConfirm}
        />
      </div>
      <button type="submit" className="btn btn-primary btn-lg">
        Зарегистрироваться
      </button>
    </form>
  );
}
const mapStateToProps = (state) => ({
  isFetching: state.profile.isFetching,
  isAuth: state.auth.isAuth,
});
export default connect(mapStateToProps, { addUser })(Registration);
