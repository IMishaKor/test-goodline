import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect, NavLink } from 'react-router-dom';
import { getNotes } from '../../redux/notes-reducer';
import { sortBy } from '../../api/function.inc';
import Note from './Note';

function Notes(props) {
  const [filterNote, setFilterNote] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [sortNotes, setSortNotes] = useState(['created', 'DESC']);

  useEffect(() => {
    props.getNotes();

    const notesObserver = (e) => {
      if (e.key === 'notes') {
        props.getNotes();
      }
    };
    window.addEventListener('storage', notesObserver, false);
    return () => {
      window.removeEventListener('storage', notesObserver, false);
    };
    // eslint-disable-next-line
  }, []);

  const onFilteredChangeNote = (e) => {
    setFilterNote(e.target.value);
  };
  const onFilteredChangeStatus = (e) => {
    setFilterStatus(e.target.value);
  };
  const onSortNotes = (fild) => {
    setSortNotes([fild, sortNotes[0] === fild ? (sortNotes[1] === 'ASC' ? 'DESC' : 'ASC') : 'ASC']);
  };

  if (!props.isAuth) {
    return <Redirect to="/login" />;
  }

  let filteredNotes = [...props.notes];
  if (filterNote !== '') {
    filteredNotes = filteredNotes.filter((n) => n.note.indexOf(filterNote) !== -1);
  }
  if (filterStatus !== '') {
    filteredNotes = filteredNotes.filter((n) => n.status === filterStatus);
  }
  filteredNotes = filteredNotes.sort(sortBy(...sortNotes));

  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <h1 className="my-3 text-center">Заметки</h1>
        <NavLink className="btn btn-light btn-lg" to="/notes/add">
          &#10010; добавить
        </NavLink>
      </div>
      <form>
        <table className="table table-hover align-middle">
          <thead>
            <tr>
              <th
                onClick={() => onSortNotes('created')}
                className={['cursor-pointer', sortNotes[0] === 'created' && 'sort_by ' + sortNotes[1]].join(' ')}
              >
                Дата
              </th>
              <th
                onClick={() => onSortNotes('note')}
                className={['cursor-pointer', sortNotes[0] === 'note' && 'sort_by ' + sortNotes[1]].join(' ')}
              >
                Заметка
              </th>
              <th
                onClick={() => onSortNotes('status')}
                className={['cursor-pointer', sortNotes[0] === 'status' && 'sort_by ' + sortNotes[1]].join(' ')}
              >
                Статус
              </th>
              <th className="notesСolumnBtn"></th>
              <th className="notesСolumnBtn"></th>
            </tr>
          </thead>
          <tbody>
            {props.isFetching ? (
              <tr>
                <td className="text-center" colSpan="5">
                  Загрузка...
                </td>
              </tr>
            ) : filteredNotes.length === 0 ? (
              <tr>
                <td className="text-center" colSpan="5">
                  {filterNote !== '' || filterStatus !== ''
                    ? 'Подходящих заметок нет, измените условия поиска.'
                    : 'Заметок нет'}
                </td>
              </tr>
            ) : (
              filteredNotes.map((n) => <Note note={n} key={n.noteId} />)
            )}
          </tbody>
          <tfoot>
            <tr>
              <th></th>
              <th>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  onChange={onFilteredChangeNote}
                  value={filterNote}
                />
              </th>
              <th>
                <select className="form-select form-select-sm" onChange={onFilteredChangeStatus} value={filterStatus}>
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
  isFetching: state.notes.isFetching,
});
export default connect(mapStateToProps, { getNotes })(Notes);
