interface ErrorResponse<T> {
  message: string;
  reason: string;
  data: T | T[];
}

export default ErrorResponse;
