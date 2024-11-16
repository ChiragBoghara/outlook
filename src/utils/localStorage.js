export const getFromLocalStorage = (key) => JSON.parse(localStorage.getItem(key) || "[]");
export const updateLocalStorage = (key, value) => localStorage.setItem(key, JSON.stringify(value));
