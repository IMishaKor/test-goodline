import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect, NavLink, useHistory } from 'react-router-dom';
import { addNote } from '../../redux/notes-reducer';

function AddNote(props) {
  const [note, setNote] = useState('');
  const [status, setStatus] = useState('Новая');
  const [errorForm, setErrorForm] = useState({});
  const history = useHistory();

  const submitForm = () => {
    if (!props.isFetching) {
      let isError = false;
      let errors = {};
      if (note === '') {
        isError = true;
        errors.note = 'Добавление заметки без самой заметки нецелесообразно.';
      }
      if (isError) {
        setErrorForm(errors);
      } else {
        props.addNote(note, status).then((d) => {
          history.push('/notes');
        });
      }
    }
  };
  const onSubmitForm = (e) => {
    e.preventDefault();
    submitForm();
  };
  useEffect(() => {
    const seveNoteKeydown = (e) => {
      if (e.ctrlKey && e.key.toLowerCase() === 's') {
        e.preventDefault();
        submitForm();
      }
    };
    document.addEventListener('keydown', seveNoteKeydown, false);
    return () => {
      document.removeEventListener('keydown', seveNoteKeydown, false);
    };
    // eslint-disable-next-line
  }, []);
  if (!props.isAuth) {
    return <Redirect to="/login" />;
  }
  return (
    <>
      <h1 className="my-3 text-center">Добавление заметки</h1>
      <form onSubmit={onSubmitForm}>
        <div className="mb-3">
          <label htmlFor="note" className="form-label">
            Текст заметки
          </label>
          <textarea
            className={['form-control form-control-lg', errorForm.note ? 'is-invalid' : ''].join(' ')}
            id="note"
            onChange={(e) => setNote(e.target.value)}
            value={note}
          />
          <div className="invalid-feedback">{errorForm.note}</div>
        </div>
        <div className="mb-3">
          <label htmlFor="status" className="form-label">
            Текст заметки
          </label>
          <select
            className="form-select form-select-lg"
            id="status"
            onChange={(e) => setStatus(e.target.value)}
            value={status}
          >
            <option value="Новая">Новая</option>
            <option value="В процессе">В процессе</option>
            <option value="Выполненая">Выполненая</option>
          </select>
        </div>

        <div className="d-flex justify-content-between">
          <button type="submit" className="btn btn-primary btn-lg " disabled={props.isFetching}>
            Добавить
          </button>
          <NavLink className="btn btn-light btn-lg" to="/registration">
            Отмена
          </NavLink>
        </div>
      </form>
    </>
  );
}
const mapStateToProps = (state) => ({
  isFetching: state.notes.isFetching,
  isAuth: state.auth.isAuth,
});
export default connect(mapStateToProps, { addNote })(AddNote);
