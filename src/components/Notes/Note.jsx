import React, { useState } from 'react';
import { connect } from 'react-redux';

function Notes(props) {
  return (
    <tr>
      <td>1</td>
      <td></td>
      <td className="notesBtnControl text-nowrap">
        <button type="submit" className="btn btn-light btn-sm mx-1">
          &#9998;
        </button>
      </td>
      <td className="notesBtnControl text-nowrap">
        <button type="submit" className="btn btn-light btn-sm">
          &#10006;
        </button>
      </td>
    </tr>
  );
}
const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
});
export default connect(mapStateToProps, {})(Notes);
