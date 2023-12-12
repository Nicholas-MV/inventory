function getCurrentTime() {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    return `${ date}`;
}

module.exports = getCurrentTime;