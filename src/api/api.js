import md5 from 'md5';
import { fakeFetch } from './function.inc';

export const authAPI = {
  async authMe(userId) {
    const response = await fakeFetch(() => {
      const result = { resultCode: null, data: null };
      const users = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : [];
      const findUser = users.find((u) => u.userId === userId);
      if (findUser) {
        result.resultCode = 1;
        result.data = findUser;
        localStorage.setItem('AUTH_USER_ID', findUser.userId);
      } else {
        result.resultCode = 2;
      }

      return result;
    });
    return response;
  },
  async authLogin(email, password) {
    const response = await fakeFetch(() => {
      const result = { resultCode: null, data: null };
      const users = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : [];
      const findUser = users.find((u) => u.email === email && u.password === md5(password));
      if (findUser) {
        result.resultCode = 1;
        result.data = findUser;
      } else {
        result.resultCode = 2;
      }

      return result;
    });
    return response;
  },
  async authLogout() {
    const response = await fakeFetch(() => {
      const result = { resultCode: null, data: null };
      result.resultCode = 1;
      localStorage.setItem('AUTH_USER_ID', 0);
      return result;
    });
    return response;
  },
};
export const profileAPI = {
  async addUser(email, name, password) {
    const response = await fakeFetch(() => {
      const result = { resultCode: null, data: null };
      const users = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : [];
      if (!users.find((u) => u.email === email)) {
        users.push({
          userId: Math.random() * Math.pow(10, 18),
          email,
          name,
          password: md5(password),
        });
        localStorage.setItem('users', JSON.stringify(users));
        result.resultCode = 1;
      } else {
        result.resultCode = 2;
      }
      return result;
    });
    return response;
  },
};
export const notesAPI = {
  async addNote(note, status) {
    const response = await fakeFetch(() => {
      const result = { resultCode: null, data: null };
      const notes = localStorage.getItem('notes') ? JSON.parse(localStorage.getItem('notes')) : [];
      const userId = +localStorage.getItem('AUTH_USER_ID');
      notes.push({
        noteId: Math.random() * Math.pow(10, 18),
        userId,
        created: Math.floor(Date.now() / 1000),
        note,
        status,
      });
      localStorage.setItem('notes', JSON.stringify(notes));
      result.resultCode = 1;
      return result;
    });
    return response;
  },
  async editNote(noteId, note, status) {
    const response = await fakeFetch(() => {
      const result = { resultCode: null, data: null };
      const notes = localStorage.getItem('notes') ? JSON.parse(localStorage.getItem('notes')) : [];

      notes.forEach((n, k) => {
        if (n.noteId === noteId) {
          n.note = note;
          n.status = status;
          delete n.editNow;
        }
      });
      localStorage.setItem('notes', JSON.stringify(notes));
      result.resultCode = 1;
      return result;
    });
    return response;
  },
  async editNoteNow(noteId, sessionTabId) {
    const response = await fakeFetch(() => {
      const result = { resultCode: null, data: null };
      const notes = localStorage.getItem('notes') ? JSON.parse(localStorage.getItem('notes')) : [];
      notes.forEach((n, k) => {
        if (n.noteId === noteId) {
          if (sessionTabId) {
            n.editNow = sessionTabId;
          } else {
            delete n.editNow;
          }
        }
      });
      localStorage.setItem('notes', JSON.stringify(notes));
      return result;
    });
    return response;
  },
  async getNotes() {
    const response = await fakeFetch(() => {
      const result = { resultCode: null, data: null };
      const userId = +localStorage.getItem('AUTH_USER_ID');
      const notes = localStorage.getItem('notes') ? JSON.parse(localStorage.getItem('notes')) : [];
      result.data = notes.filter((n) => n.userId === userId);
      result.resultCode = 1;
      return result;
    });
    return response;
  },
  async getNote(noteId, sessionTabId) {
    const response = await fakeFetch(() => {
      const result = { resultCode: null, data: null };
      const userId = +localStorage.getItem('AUTH_USER_ID');
      const notes = localStorage.getItem('notes') ? JSON.parse(localStorage.getItem('notes')) : [];
      result.data = notes.find((n) => n.userId === userId && n.noteId === noteId);
      if (result.data) {
        result.resultCode = 1;
        if (!result.data.editNow) {
          result.data.editNow = sessionTabId;
          notes.forEach((n, k) => {
            if (n.noteId === noteId) {
              if (sessionTabId) {
                n.editNow = sessionTabId;
              }
            }
          });
          localStorage.setItem('notes', JSON.stringify(notes));
        }
      } else {
        result.resultCode = 2;
      }
      return result;
    });
    return response;
  },
  async removeNote(noteId) {
    const response = await fakeFetch(() => {
      const result = { resultCode: null, data: null };
      const notes = localStorage.getItem('notes') ? JSON.parse(localStorage.getItem('notes')) : [];

      localStorage.setItem('notes', JSON.stringify(notes.filter((n) => n.noteId !== noteId)));

      result.resultCode = 1;
      return result;
    });
    return response;
  },
};
