module.exports = (req, res, next) => {
  req.data = Object.assign({}, req.query, req.body || {}, req.params);

  next();
}
