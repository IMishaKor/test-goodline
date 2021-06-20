import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect, NavLink, useHistory } from 'react-router-dom';
import { getNote, editNote, updateNoteForm } from '../../redux/notes-reducer';

function EditNote(props) {
  const noteId = +props.match.params.noteId;
  const disabledEdit = props.noteForm.editNow && props.noteForm.editNow !== props.sessionTabId;
  const [errorForm, setErrorForm] = useState({});
  const history = useHistory();

  useEffect(() => {
    props.getNote(noteId);

    const editNoteNowObserver = (e) => {
      if (e.key === 'notes') {
        props.getNote(noteId);
      }
    };
    window.addEventListener('storage', editNoteNowObserver, false);
    return () => {
      window.removeEventListener('storage', editNoteNowObserver, false);
    };
    // eslint-disable-next-line
  }, []);

  const seveNoteKeydown = (e) => {
    if (e.ctrlKey && e.key.toLowerCase() === 's') {
      e.preventDefault();
      submitForm();
    }
  };
  useEffect(() => {
    document.addEventListener('keydown', seveNoteKeydown, false);
    return () => {
      document.removeEventListener('keydown', seveNoteKeydown, false);
    };
  }, [props.noteForm.note, props.noteForm.status, props.isFetching]);

  const submitForm = () => {
    if (!props.isFetching) {
      let isError = false;
      let errors = {};
      if (props.noteForm.note === '') {
        isError = true;
        errors.note = 'Добавление заметки без самой заметки нецелесообразно.';
      }
      if (isError) {
        setErrorForm(errors);
      } else {
        props.editNote().then((d) => {
          history.push('/notes');
        });
      }
    }
  };
  const onSubmitForm = (e) => {
    e.preventDefault();
    submitForm();
  };
  if (!props.isAuth) {
    return <Redirect to="/login" />;
  }
  return (
    <>
      <h1 className="my-3 text-center">Редактирование заметки</h1>
      <form onSubmit={onSubmitForm}>
        {disabledEdit && (
          <div className="alert alert-warning">
            В данный момент заметку ктото редактирует. Подождите или попробуйте позже.
          </div>
        )}
        <div className="mb-3">
          <label htmlFor="note" className="form-label">
            Текст заметки
          </label>
          <textarea
            className={['form-control form-control-lg', errorForm.note ? 'is-invalid' : ''].join(' ')}
            id="note"
            onChange={(e) => {
              props.updateNoteForm('note', e.target.value);
            }}
            value={props.noteForm.note}
            disabled={props.isFetching || disabledEdit}
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
            onChange={(e) => {
              props.updateNoteForm('status', e.target.value);
            }}
            value={props.noteForm.status}
            disabled={props.isFetching || disabledEdit}
          >
            <option value="Новая">Новая</option>
            <option value="В процессе">В процессе</option>
            <option value="Выполненая">Выполненая</option>
          </select>
        </div>

        <div className="d-flex justify-content-between">
          <button type="submit" className="btn btn-primary btn-lg " disabled={props.isFetching || disabledEdit}>
            Сохранить
          </button>
          <NavLink className="btn btn-light btn-lg" to="/notes">
            Отмена
          </NavLink>
        </div>
      </form>
    </>
  );
}
const mapStateToProps = (state) => ({
  isFetching: state.notes.isFetching,
  noteForm: state.notes.noteForm,
  sessionTabId: state.app.sessionTabId,
  isAuth: state.auth.isAuth,
});
export default connect(mapStateToProps, { getNote, editNote, updateNoteForm })(EditNote);
