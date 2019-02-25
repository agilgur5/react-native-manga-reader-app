// copied from https://gist.github.com/benjick/c48dd2db575e79c7b0b1043de4556ebc

/* globals window */

// Borrowed from https://raw.githubusercontent.com/pinqy520/mobx-persist/8d68e5b50575feec8a44cd0db7313d08d96d2255/lib/storage.js
export function clear() {
  return new Promise((resolve, reject) => {
    try {
      window.localStorage.clear();
      resolve(null);
    } catch (err) {
      reject(err);
    }
  });
}
export function getItem(key) {
  return new Promise((resolve, reject) => {
    try {
      const value = window.localStorage.getItem(key);
      resolve(value);
    } catch (err) {
      reject(err);
    }
  });
}

export function removeItem(key) {
  return new Promise((resolve, reject) => {
    try {
      window.localStorage.removeItem(key);
      resolve(null);
    } catch (err) {
      reject(err);
    }
  });
}

export function setItem(key, value) {
  return new Promise((resolve, reject) => {
    try {
      window.localStorage.setItem(key, value);
      resolve(null);
    } catch (err) {
      reject(err);
    }
  });
}
