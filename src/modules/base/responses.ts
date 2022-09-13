export class Responses {
  static created<T>(data?: T) {
    return {
      error: false,
      message: 'created',
      data,
      status: 201,
    };
  }

  static returnWithData<T>(data: T, message = '') {
    return {
      error: false,
      message,
      data,
      status: 200,
    };
  }

  static responseWithCustomMessage(message = 'Ok') {
    return {
      error: false,
      message,
      data: {},
      status: 200,
    };
  }

  static unauthorized(message = '') {
    return {
      error: true,
      message,
      data: {},
      status: 401,
    };
  }

  static internalServerError(message: unknown) {
    return {
      error: true,
      message: `${message}`,
      data: {},
      status: 500,
    };
  }

  static badRequest(message: string) {
    return {
      error: true,
      message,
      data: {},
      status: 400,
    };
  }

  static notFound(message = 'Not Found') {
    return {
      error: true,
      message,
      data: {},
      status: 404,
    };
  }
}
