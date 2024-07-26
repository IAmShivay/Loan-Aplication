
module.exports = (AsyncFunc) => (req, res, next) => {
    Promise.resolve(AsyncFunc(req, res, next)).catch(next)
}