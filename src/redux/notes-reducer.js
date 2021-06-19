import { notesAPI } from '../api/api';

const NOTES_ADD_NOTE = 'NOTES/ADD_NOTE';
const NOTES_GET_NOTES = 'NOTES/GET_NOTES';
const NOTES_TOGGLE_IS_FETCHING = 'NOTES/TOGGLE_IS_FETCHING';

let initialState = {
  notes: [],
  isFetching: false,
};

const notesReducer = (state = initialState, action) => {
  switch (action.type) {
    case NOTES_ADD_NOTE:
      return {
        ...state,
      };
    case NOTES_GET_NOTES:
      return {
        ...state,
        notes: action.notes,
      };
    case NOTES_TOGGLE_IS_FETCHING:
      return {
        ...state,
        isFetching: action.isFetching,
      };
    default:
      return state;
  }
};

const _getNotes = (notes) => ({ type: NOTES_GET_NOTES, notes });
const _toggleIsFetching = (isFetching) => ({ type: NOTES_TOGGLE_IS_FETCHING, isFetching });

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
export const filterNotes = (dispatch) => {
  console.log(1);
};

export default notesReducer;
