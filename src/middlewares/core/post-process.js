module.exports = (req, res, next) => {
  res
    .status(200)
    .set({ 'Content-Type': 'application/json'})
    // .json({ status : 200, data : res.data });
    .json({ ...res.data });
}
