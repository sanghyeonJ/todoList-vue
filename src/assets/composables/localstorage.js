export function useLocalStorage() {
  const getItem = (key) => {
    return JSON.parse(localStorage.getItem(key))
  }

  const setItem = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value))
  }

  return { getItem, setItem }
}
