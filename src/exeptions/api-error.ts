export class ApiError {
  status: number;
  errors: [];
  message: string;

  constructor(status: number, message: string, errors: [] = []) {
    this.status = status;
    this.errors = errors;
    this.message = message;
  }

  static UnauthorizedError() {
    return new ApiError(401, 'Пользователь не авторизован');
  }

  static BadRequest(message: string, errors: [] = []) {
    return new ApiError(400, message, errors);
  }
}
