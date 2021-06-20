import { notesAPI } from '../api/api';

const ADD_NOTE = 'NOTES/ADD_NOTE';
const GET_NOTES = 'NOTES/GET_NOTES';

const SET_NOTE_FORM = 'NOTES/SET_NOTE_FORM';
const UPDATE_NOTE_FORM = 'NOTES/UPDATE_NOTE_FORM';
const CLEAR_NOTE_FORM = 'NOTES/CLEAR_NOTE_FORM';

const REMOVE_NOTE = 'NOTES/REMOVE_NOTE';
const TOGGLE_IS_FETCHING = 'NOTES/TOGGLE_IS_FETCHING';

let initialState = {
  notes: [],
  noteForm: {},
  isFetching: false,
};

const notesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_NOTE:
      return {
        ...state,
      };
    case GET_NOTES:
      return {
        ...state,
        notes: action.notes,
      };
    case SET_NOTE_FORM:
      return {
        ...state,
        noteForm: action.peyload,
      };
    case UPDATE_NOTE_FORM:
      return {
        ...state,
        noteForm: { ...state.noteForm, [action.peyload.fild]: action.peyload.value },
      };
    case CLEAR_NOTE_FORM:
      return {
        ...state,
        noteForm: {},
      };
    case REMOVE_NOTE:
      return {
        ...state,
        notes: state.notes.filter((n) => n.noteId !== action.noteId),
      };
    case TOGGLE_IS_FETCHING:
      return {
        ...state,
        isFetching: action.isFetching,
      };
    default:
      return state;
  }
};

const _getNotes = (notes) => ({ type: GET_NOTES, notes });
const _setNoteForm = (noteId, note, status, editNow) => ({
  type: SET_NOTE_FORM,
  peyload: { noteId, note, status, editNow },
});
export const updateNoteForm = (fild, value) => ({ type: UPDATE_NOTE_FORM, peyload: { fild, value } });
const _clearNoteForm = () => ({ type: CLEAR_NOTE_FORM });
const _removeNote = (noteId) => ({ type: REMOVE_NOTE, noteId });
const _toggleIsFetching = (isFetching) => ({ type: TOGGLE_IS_FETCHING, isFetching });

export const addNote = (note, status) => async (dispatch) => {
  try {
    dispatch(_toggleIsFetching(true));
    const addNoteData = await notesAPI.addNote(note, status);
    if (addNoteData.resultCode === 1) {
      console.log('Регистрация прошла успешно');
    } else {
      console.log('Чтото пошло не так');
    }
    dispatch(_toggleIsFetching(false));
    return addNoteData.data;
  } catch (error) {
    console.error(error);
  }
};
export const editNote = () => async (dispatch, getState) => {
  try {
    dispatch(_toggleIsFetching(true));
    const noteForm = getState().notes.noteForm;
    const editNoteData = await notesAPI.editNote(noteForm.noteId, noteForm.note, noteForm.status);
    if (editNoteData.resultCode === 1) {
      dispatch(_clearNoteForm());
      console.log('Редактирование прошло успешно');
    } else {
      console.log('Чтото пошло не так');
    }
    dispatch(_toggleIsFetching(false));
    return editNoteData.data;
  } catch (error) {
    console.error(error);
  }
};
export const setEditNoteNow = (noteId, sessionTabId) => async (dispatch) => {
  try {
    await notesAPI.editNoteNow(noteId, sessionTabId);
  } catch (error) {
    console.error(error);
  }
};
export const getNotes = () => async (dispatch) => {
  try {
    dispatch(_toggleIsFetching(true));
    const getNotesData = await notesAPI.getNotes();
    dispatch(_getNotes(getNotesData.data));
    dispatch(_toggleIsFetching(false));
  } catch (error) {
    console.error(error);
  }
};
export const getNote = (noteId) => async (dispatch, getState) => {
  try {
    dispatch(_toggleIsFetching(true));
    const sessionTabId = getState().app.sessionTabId;
    const getNoteData = await notesAPI.getNote(noteId, sessionTabId);
    dispatch(
      _setNoteForm(getNoteData.data.noteId, getNoteData.data.note, getNoteData.data.status, getNoteData.data.editNow)
    );
    dispatch(_toggleIsFetching(false));
    return getNoteData.data;
  } catch (error) {
    console.error(error);
  }
};
// export const updateNoteForm = (fild, value) => (dispatch) => {
//   dispatch(_updateNoteForm(fild, value));
// };

export const removeNote = (noteId) => async (dispatch) => {
  try {
    const getNoteData = await notesAPI.removeNote(noteId);
    dispatch(_removeNote(noteId));
    return getNoteData.data;
  } catch (error) {
    console.error(error);
  }
};

export default notesReducer;
