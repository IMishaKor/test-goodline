import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { removeNote } from '../../redux/notes-reducer';

function Notes(props) {
  return (
    <tr>
      <td className="text-nowrap">{new Date(props.note.created * 1000).toISOString().substr(0, 10)}</td>
      <td>{props.note.note}</td>
      <td>{props.note.status}</td>
      <td className="notesBtnControl text-nowrap">
        <NavLink to={`/notes/edit/${props.note.noteId}`} className="btn btn-light btn-sm mx-1">
          &#9998;
        </NavLink>
      </td>
      <td className="notesBtnControl text-nowrap">
        <button
          type="button"
          className="btn btn-light btn-sm"
          onClick={(e) => {
            e.target.disabled = true;
            props.removeNote(props.note.noteId);
          }}
        >
          &#10006;
        </button>
      </td>
    </tr>
  );
}
export default connect(null, { removeNote })(Notes);
