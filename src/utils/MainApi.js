
export const BASE_URL = 'https://api.newsaburlu04.students.nomoredomains.rocks';

export const register = (email, password, name) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {      
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ password, email, name })
  })
  .then((res) => {
    if (res.ok) {
    return res.json();
    }
    return Promise.reject(res);
  })    
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {      
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
  .then((res) => {    
    if (res.ok) {
      return res.json();
      }
      return Promise.reject(res);   
  })
};

export const getContent = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  .then((res) => res.json())   
};

export const getArticles = (token) => {
    return fetch(`${BASE_URL}/articles`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status} - ${res.statusText}`);
    });

  };
  
  export const saveArticle = (article) => {
    return fetch(`${BASE_URL}/articles`, {
      method: 'POST',
      headers: { 
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
      },
      body: JSON.stringify(article)
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status} - ${res.statusText}`);
    });
  };
  export const deleteArticle = (articleId) => {
    return fetch(`${BASE_URL}/articles/${articleId}`, {
      method: 'DELETE',
      headers: { 
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status} - ${res.statusText}`);
    });
  };