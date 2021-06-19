import { useEffect } from 'react';
import { connect } from 'react-redux';
import { authMe } from '../../redux/auth-reducer';

function AuthObserver(props) {
  useEffect(() => {
    window.addEventListener('storage', function (e) {
      if (e.key === 'AUTH_USER_ID') {
        const userId = +localStorage.getItem(e.key);
        props.authMe(userId);
      }
    });
    // eslint-disable-next-line
  }, []);
  return <></>;
}
const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
});
export default connect(mapStateToProps, { authMe })(AuthObserver);
