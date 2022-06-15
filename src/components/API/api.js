const apiConfig = {
  url: "https://norma.nomoreparties.space/api", //ссылка
  headers: {},
};

const parseResponse = (res) => {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(res.status);
  }
};

export { apiConfig, parseResponse };
