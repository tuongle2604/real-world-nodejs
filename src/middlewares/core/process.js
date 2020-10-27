module.exports = (controler) => (req, res, next) => {
   try {
    const promise = controler(req.data);

    Promise.resolve(promise)
      .then(data => {
        res.data = data;
        next();
      })
      .catch(err => console.log(err));
      
   } catch(err) {
    console.log(err)
   }
}
