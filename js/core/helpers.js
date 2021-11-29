export function getURLParams(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

export function getItemFromStorage(name, defaultValue = []) {
    return JSON.parse(localStorage.getItem(name)) || defaultValue;
}