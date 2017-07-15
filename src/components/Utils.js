import React from "react";

export function If({condition, children}) {
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

const storage = document.localStorage || {
  setItem(k, v) { this[k] = v },
  getItem(k) { return this[k] }
 };

export function storeObject(key, object) {
  storage.setItem(key, JSON.stringify(object));
}

export function retrieveObject(key) {
  const value = storage.getItem(key);
  return value ? JSON.parse(value) : null;
}