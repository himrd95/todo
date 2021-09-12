function loadData(key) {
    let data = JSON.parse(localStorage.getItem({key}))
    return data
}

function saveData(key, payload) {
    localStorage.setItem({key}, JSON.stringify(payload));
}

export { loadData, saveData };