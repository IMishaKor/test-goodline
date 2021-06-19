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
                  <div className="nav-link active">Здравствуйте, {props.authUser.name}!</div>
                </li>
                <li className="nav-item">
                  <div className="nav-link cursor-pointer" onClick={onClickLogout}>
                    Выйти
                  </div>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/login">
                    Войти
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/registration">
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
