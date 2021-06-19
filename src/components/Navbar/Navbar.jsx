import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { authLogout } from '../../redux/auth-reducer';
import logo from '../../logo.png';

function Navbar(props) {
  const onClickLogout = () => {
    props.authLogout();
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <a className="navbar-brand mb-0 h1" href="/">
          <img src={logo} className="d-inline-block align-text-top" alt="logo" />
          OnlineNotes
        </a>
        <div>
          <ul className="navbar-nav">
            {props.isAuth ? (
              <>
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="#">
                    Здравствуйте, {props.authUser.name}!
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" aria-current="page" href="#" onClick={onClickLogout}>
                    Выйти
                  </a>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" aria-current="page" to="/login">
                    Войти
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" aria-current="page" to="/registration">
                    Регистрация
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
  authUser: state.auth.authUser,
});
export default connect(mapStateToProps, { authLogout })(Navbar);
