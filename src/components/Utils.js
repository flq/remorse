import React from "react";

export const APP_STATE_KEY = "remorse.state";
export const APP_READ_TRAINDATA_KEY = "remorse.traindata.read";
export const APP_WRITE_TRAINDATA_KEY = "remorse.traindata.write";

export function If({ condition, children }) {
  return condition ? children : null;
}

export function NumberWithUnit({ children, unit }) {
  return (
    <div className="numberWithUnit">
      <span>
        {children}
      </span>
      <span>
        {unit}
      </span>
    </div>
  );
}

const storage = window.localStorage || {
  setItem(k, v) {
    this[k] = v;
  },
  getItem(k) {
    return this[k];
  }
};

export function storeObject(key, object) {
  storage.setItem(key, JSON.stringify(object));
}

export function retrieveObject(key) {
  const value = storage.getItem(key);
  return value ? JSON.parse(value) : null;
}

export function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  //The maximum is exclusive and the minimum is inclusive
  return Math.floor(Math.random() * (max - min)) + min; 
}
