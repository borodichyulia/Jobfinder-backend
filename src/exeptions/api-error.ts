export class ApiError {
  status: number;
  errors: [];
  message: string;

  constructor(status: number, message: string, errors: [] = []) {
    this.status = status;
    this.errors = errors;
    this.message = message;
  }

  static UnauthorizedError(message: string) {
    return new ApiError(401, message);
  }

  static BadRequest(message: string, errors: [] = []) {
    return new ApiError(400, message, errors);
  }

  static UnsupportedImage(message: string) {
    return new ApiError(415, message);
  }
}
