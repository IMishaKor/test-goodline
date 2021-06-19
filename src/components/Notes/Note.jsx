import React, { useState } from 'react';
import { connect } from 'react-redux';

function Notes(props) {
  console.log(props);
  return (
    <tr>
      <td>{props.note.note}</td>
      <td>{props.note.status}</td>
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
const mapStateToProps = (state) => ({});
export default connect(mapStateToProps, {})(Notes);
