const notFound = (req, res) => {
  res.status(404).send("Route/Link not found!!!");
};

module.exports = notFound;
