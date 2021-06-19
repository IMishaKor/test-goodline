// функция имитируящая запрос на сервер
function fakeFetch(callback = {}) {
  const data = callback();
  return new Promise((resolve) => {
    setTimeout(() => resolve({ data }), 1000);
  });
}

export const authAPI = {
  async authMe() {
    // const response = await instans.get(`/auth/me`);
    const response = await fakeFetch(() => localStorage.getItem('authUser'));
    return response.data;
  },
  async authLogin(email, password, rememberMe = false) {
    // const response = await instans.post(`/auth/login`, { email, password, rememberMe, captcha });
    const response = await fakeFetch(() => {
      return {};
    });

    return response.data;
  },
  async authLogout() {
    // const response = await instans.delete(`/auth/login`);
    const response = {};
    return response.data;
  },
};
