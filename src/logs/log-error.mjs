import logger from './logger.mjs';

function logErrors(err, req, res, next) {
  logger.error(err.stack);
  next(err);
}

export default logErrors;
