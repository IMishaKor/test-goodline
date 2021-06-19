import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

function Notes(props) {
  if (!props.isAuth) {
    return <Redirect to="/login" />;
  }
  return (
    <ul className="list-group">
      <li className="list-group-item d-flex justify-content-between align-items-center ">
        Заметка 1
        <div className="text-nowrap">
          <button type="submit" className="btn btn-default btn-sm mx-1">
            &#9998;
          </button>
          <button type="submit" className="btn btn-default btn-sm">
            &#10006;
          </button>
        </div>
      </li>
      <li className="list-group-item d-flex justify-content-between align-items-center ">
        Заметка 2
        <div className="text-nowrap">
          <button type="submit" className="btn btn-default btn-sm mx-1">
            &#9998;
          </button>
          <button type="submit" className="btn btn-default btn-sm">
            &#10006;
          </button>
        </div>
      </li>
      <li className="list-group-item d-flex justify-content-between align-items-center ">
        Заметка 3
        <div className="text-nowrap">
          <button type="submit" className="btn btn-default btn-sm mx-1">
            &#9998;
          </button>
          <button type="submit" className="btn btn-default btn-sm">
            &#10006;
          </button>
        </div>
      </li>
    </ul>
  );
}
const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
});
export default connect(mapStateToProps, {})(Notes);
