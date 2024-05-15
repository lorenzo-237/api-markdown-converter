const dictionary = {};

dictionary['412'] = 'PRECONDITION_FAILED';

class ErrorMessage extends Error {
  constructor(message, status = 500) {
    super();
    this.name = dictionary[status + ''];
    this.message = message;
    this.status = status;
    this.myError = true;
  }
}

export default ErrorMessage;
