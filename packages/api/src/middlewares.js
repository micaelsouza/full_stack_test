exports.notFound = (req, res, next) => {
  res.boom.notFound(`🔍 - Not Found - ${req.originalUrl}`);
  next();
};

exports.errorHandler = (err, _req, res) => {
  res.boom.badRequest(process.env.NODE_ENV === 'production' ? '🥞' : err.message);
};
