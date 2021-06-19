import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect, NavLink } from 'react-router-dom';
import { getNotes } from '../../redux/notes-reducer';
import Note from './Note';

function Notes(props) {
  useEffect(() => {
    props.getNotes();
    // eslint-disable-next-line
  }, []);
  if (!props.isAuth) {
    return <Redirect to="/login" />;
  }
  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <h1 className="my-3 text-center">Заметки</h1>
        <NavLink className="btn btn-light btn-lg" to="/notes/add">
          &#10010; добавить
        </NavLink>
      </div>
      <form>
        <table className="table align-middle">
          <thead>
            <tr>
              <th>Заметка</th>
              <th className="notesСolumnStatus">Статус</th>
              <th className="notesСolumnBtn"></th>
              <th className="notesСolumnBtn"></th>
            </tr>
          </thead>
          <tbody>
            <Note />
          </tbody>
          <tfoot>
            <tr>
              <th>
                <input type="text" className="form-control form-control-sm" />
              </th>
              <th>
                <select className="form-select form-select-sm ">
                  <option value="">...</option>
                  <option value="Новая">Новая</option>
                  <option value="В процессе">В процессе</option>
                  <option value="Выполненая">Выполненая</option>
                </select>
              </th>
              <th></th>
              <th></th>
            </tr>
          </tfoot>
        </table>
      </form>
    </>
  );
}
const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
  notes: state.notes.notes,
});
export default connect(mapStateToProps, { getNotes })(Notes);
