function errorHandler(err, req, res, next) {
  if (err.myError === true) {
    res.status(err.status);
    res.json({
      name: err.name,
      status: err.status,
      message: err.message,
    });
    return;
  }

  res.status(500);
  res.send(err);
}

export default errorHandler;
