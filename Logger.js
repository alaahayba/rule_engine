module.exports = class Logger {
    info(data) {
        console.log(...data)
    }
    error(key, data) {
        console.log(key, data)
    }
}