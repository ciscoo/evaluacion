/**
 * Catches all `async-await` errors from controller actions.
 * Each action is wrapped with `catchErrors` to avoid having
 * to write `try-catch` all the time.
 *
 */
exports.catchErrors = action => (req, res, next) => action(req, res).catch(next);

/**
 * Catch all invalid routes and pass it on to the error handler.
 */
exports.invalidRoute = (req, res, next) => {
  const error = new Error('Invalid route.');
  error.status = 404;
  next(error);
};

/**
 * Checks to see if there are MongoDB/mongoose validation errors.
 * If none exists then the request is passed to the next error handler.
 */
exports.validationErrors = (error, req, res, next) => {
  if (!error.errors) {
    next(error);
    return;
  }
  const { errors } = error;
  Object.keys(errors).forEach(key => delete errors[key].properties);
  res.status(400).json({
    status: 400,
    error: errors,
  });
};

/**
 * The last error handler in the chain. Formats the error based
 * on the `NODE_ENV` environment variable.
 */
exports.displayErrors = (error, req, res, next) => { // eslint-disable-line no-unused-vars
  const err = error;
  const status = err.status || 500;
  delete err.status;
  err.message = err.message || 'Something went wrong.';

  if (process.env.NODE_ENV === 'production') {
    delete err.stack;
  } else {
    err.stack = err.stack || '';
  }

  res.status(status).json({
    status,
    error: {
      message: err.message,
    },
  });
};
