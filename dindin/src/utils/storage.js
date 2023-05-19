export const getItem = (key) => {
    const response = localStorage.getItem(key);
    return response
}
export function setItem(key, value) {
    localStorage.setItem(key, value)
}
export function clearStorage() {
    localStorage.clear()
}