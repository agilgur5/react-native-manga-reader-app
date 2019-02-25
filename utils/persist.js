// copied from https://gist.github.com/benjick/c48dd2db575e79c7b0b1043de4556ebc

/* globals localStorage */
import { onSnapshot, applySnapshot } from 'mobx-state-tree';
import Storage from './storage';

export const persist = (name, store, options, schema = {}) => {
  let hydrated = false;

  let storage = options.storage;

  if (typeof localStorage !== 'undefined' && localStorage === storage) {
    storage = Storage;
  }

  onSnapshot(store, (_snapshot) => {
    if (!hydrated) {
      return;
    }
    const snapshot = { ..._snapshot };
    Object.keys(snapshot).forEach((key) => {
      if (!schema[key]) {
        delete snapshot[key];
      }
    });
    const data = !options.jsonify ? snapshot : JSON.stringify(snapshot);
    storage.setItem(name, data);
  });

  storage.getItem(name)
    .then((data) => {
      if (data) {
        const snapshot = !options.jsonify ? data : JSON.parse(data);
        applySnapshot(store, snapshot);
        if (store.afterHydration && typeof store.afterHydration === 'function') {
          store.afterHydration();
        }
      }
      // modified from gist source so it works when there is no data too
      hydrated = true;
    });
};
