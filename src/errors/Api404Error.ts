import HttpError from './HttpError';
import { httpStatusCodes } from './httpStatusCode';


class Api404Error extends HttpError {
  constructor(
    name: string,
    statusCode = httpStatusCodes.NOT_FOUND,
    description = 'Not found.',
    isOperational = true
  ) {
    super(name, statusCode, isOperational, description);
  }
}

export default Api404Error;
